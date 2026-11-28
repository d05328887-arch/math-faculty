-- Факультет математики ХГУ — обновление базы Supabase.
-- Как запустить: Supabase → ваш проект → SQL Editor → New query →
-- вставьте весь этот файл → Run. Запускать можно повторно, ничего не сломается.
--
-- Что добавляет:
--   1) удаление пользователей (вход закрывается, баллы и сообщения сохраняются);
--   2) создание сотрудников и студентов администратором, смену пароля;
--   3) настройки сайта: разрешения по разделам и дату начала семестра;
--   4) фото, видео и голосовые сообщения в чате.

create extension if not exists pgcrypto with schema extensions;

-- ---------- 1. Пометка «удалён» ----------
alter table public.profiles add column if not exists blocked boolean not null default false;

create or replace function public.mf_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles
                 where id = auth.uid() and role = 'admin' and not blocked);
$$;

create or replace function public.mf_is_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles
                 where id = auth.uid() and role in ('student', 'teacher', 'admin') and not blocked);
$$;

-- Снять или поставить пометку «удалён» может только администратор.
create or replace function public.mf_guard_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.blocked is distinct from old.blocked and auth.uid() is not null and not public.mf_is_admin() then
    raise exception 'Только администратор может удалять пользователей';
  end if;
  return new;
end $$;
drop trigger if exists mf_guard_profile on public.profiles;
create trigger mf_guard_profile before update on public.profiles
  for each row execute function public.mf_guard_profile();

-- ---------- 2. Функции администратора ----------
-- Заполнить профиль нового пользователя (вызывается сразу после создания аккаунта).
create or replace function public.mf_admin_setup_user(
  p_id uuid, p_login text, p_full_name text, p_role text, p_dept int, p_grp text
) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.mf_is_admin() then raise exception 'Нет прав'; end if;
  if p_role not in ('student', 'teacher', 'admin') then raise exception 'Неверная роль'; end if;
  if not exists (select 1 from auth.users where id = p_id) then raise exception 'Пользователь не найден'; end if;
  update auth.users set email_confirmed_at = coalesce(email_confirmed_at, now()) where id = p_id;
  insert into public.profiles (id, login, full_name, role, dept, grp)
  values (p_id, p_login, p_full_name, p_role, p_dept, nullif(trim(coalesce(p_grp, '')), ''))
  on conflict (id) do update
    set login = excluded.login, full_name = excluded.full_name, role = excluded.role,
        dept = excluded.dept, grp = excluded.grp, blocked = false;
end $$;

-- Удалить (p_blocked = true) или вернуть (false) пользователя.
create or replace function public.mf_admin_set_blocked(p_id uuid, p_blocked boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.mf_is_admin() then raise exception 'Нет прав'; end if;
  if p_id = auth.uid() then raise exception 'Нельзя удалить самого себя'; end if;
  update public.profiles set blocked = p_blocked where id = p_id;
  update auth.users
     set banned_until = case when p_blocked then now() + interval '100 years' else null end
   where id = p_id;
  if p_blocked then
    begin delete from auth.sessions where user_id = p_id; exception when others then null; end;
    begin delete from auth.refresh_tokens where user_id = p_id::text; exception when others then null; end;
  end if;
end $$;

-- Новый пароль для пользователя.
create or replace function public.mf_admin_set_password(p_id uuid, p_password text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.mf_is_admin() then raise exception 'Нет прав'; end if;
  if length(coalesce(p_password, '')) < 8 then raise exception 'Пароль — минимум 8 символов'; end if;
  update auth.users
     set encrypted_password = extensions.crypt(p_password, extensions.gen_salt('bf')), updated_at = now()
   where id = p_id;
end $$;

-- ---------- 3. Настройки сайта ----------
create table if not exists public.mf_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.mf_settings enable row level security;
drop policy if exists "mf_settings read" on public.mf_settings;
create policy "mf_settings read" on public.mf_settings for select to authenticated using (true);
drop policy if exists "mf_settings write" on public.mf_settings;
create policy "mf_settings write" on public.mf_settings for all to authenticated
  using (public.mf_is_admin()) with check (public.mf_is_admin());
grant select, insert, update, delete on public.mf_settings to authenticated;

-- ---------- 4. Файлы в чате ----------
alter table public.messages add column if not exists file_path text;
alter table public.messages add column if not exists file_type text;
alter table public.messages add column if not exists file_name text;

-- Может ли текущий пользователь видеть комнату чата.
create or replace function public.mf_room_ok(p_room text) returns boolean
language sql stable security definer set search_path = public as $$
  select public.mf_is_member() and (
       public.mf_is_admin()
    or exists (select 1 from public.rooms r where r.id::text = p_room and (r.is_general or r.created_by = auth.uid()))
    or exists (select 1 from public.room_members m where m.room_id::text = p_room and m.user_id = auth.uid())
  );
$$;

insert into storage.buckets (id, name, public, file_size_limit)
values ('chat', 'chat', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = 52428800;

-- Путь файла: <комната>/<пользователь>/<имя файла>
drop policy if exists "mf chat read" on storage.objects;
create policy "mf chat read" on storage.objects for select to authenticated
  using (bucket_id = 'chat' and public.mf_room_ok((storage.foldername(name))[1]));
drop policy if exists "mf chat upload" on storage.objects;
create policy "mf chat upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'chat'
              and (storage.foldername(name))[2] = auth.uid()::text
              and public.mf_room_ok((storage.foldername(name))[1]));
drop policy if exists "mf chat delete" on storage.objects;
create policy "mf chat delete" on storage.objects for delete to authenticated
  using (bucket_id = 'chat' and ((storage.foldername(name))[2] = auth.uid()::text or public.mf_is_admin()));

-- ---------- права на функции ----------
revoke all on function public.mf_admin_setup_user(uuid, text, text, text, int, text) from public, anon;
revoke all on function public.mf_admin_set_blocked(uuid, boolean) from public, anon;
revoke all on function public.mf_admin_set_password(uuid, text) from public, anon;
grant execute on function public.mf_admin_setup_user(uuid, text, text, text, int, text) to authenticated;
grant execute on function public.mf_admin_set_blocked(uuid, boolean) to authenticated;
grant execute on function public.mf_admin_set_password(uuid, text) to authenticated;
grant execute on function public.mf_is_admin() to authenticated;
grant execute on function public.mf_is_member() to authenticated;
grant execute on function public.mf_room_ok(text) to authenticated;

select 'Готово: база обновлена' as result;

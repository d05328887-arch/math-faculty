-- Обновление №2 (защита данных и добавление группы). Запускать, если файл
-- supabase-setup.sql уже запускался раньше. Можно запускать повторно.
-- Последняя строка этого файла выводит «Готово: обновление 2».

-- Роль, кафедру, группу, логин и пометку «удалён» меняет только администратор.
create or replace function public.mf_guard_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.mf_is_admin() then
    if new.blocked is distinct from old.blocked then
      raise exception 'Только администратор может удалять пользователей';
    end if;
    if new.role is distinct from old.role or new.login is distinct from old.login
       or new.dept is distinct from old.dept or new.grp is distinct from old.grp or new.id is distinct from old.id then
      raise exception 'Эти данные меняет только администратор';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists mf_guard_profile on public.profiles;
create trigger mf_guard_profile before update on public.profiles
  for each row execute function public.mf_guard_profile();

-- ---------- 5. Защита данных ----------
-- Для каждой таблицы задаём точные правила. Политики «mf …» одновременно разрешающие и
-- ограничивающие (restrictive), поэтому действуют именно они, какие бы старые правила ни были.

-- Новые аккаунты (кроме созданных администратором) всегда получают роль «ждёт подтверждения».
create or replace function public.mf_profile_new() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.mf_is_admin() then new.role := 'pending'; new.blocked := false; end if;
  return new;
end $$;
drop trigger if exists mf_profile_new on public.profiles;
create trigger mf_profile_new before insert on public.profiles
  for each row execute function public.mf_profile_new();

create or replace function public.mf_teaches(p_subject bigint) returns boolean
language sql stable security definer set search_path = public as $$
  select public.mf_is_member() and exists (select 1 from public.subjects s where s.id = p_subject and s.teacher_id = auth.uid());
$$;
create or replace function public.mf_room_owner(p_room bigint) returns boolean
language sql stable security definer set search_path = public as $$
  select public.mf_is_member() and exists (select 1 from public.rooms r where r.id = p_room and r.created_by = auth.uid());
$$;

-- Преподаватель меняет у своего предмета только силлабус; остальное — администратор.
create or replace function public.mf_guard_subject() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.mf_is_admin() then
    if new.name is distinct from old.name or new.dept is distinct from old.dept
       or new.teacher_id is distinct from old.teacher_id or new.id is distinct from old.id then
      raise exception 'Преподаватель может менять только силлабус';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists mf_guard_subject on public.subjects;
create trigger mf_guard_subject before update on public.subjects
  for each row execute function public.mf_guard_subject();

-- Баллы: дневные 0–10, рубежи и экзамен 0–100; рубеж 1 открывается через 8 недель,
-- рубеж 2 и экзамен — через 16 недель от начала семестра (администратор может всегда).
create or replace function public.mf_guard_grade() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_start date; v_today date := (now() at time zone 'Asia/Dushanbe')::date;
begin
  if new.kind = 'w' and (new.value < 0 or new.value > 10) then raise exception 'Дневной балл — от 0 до 10'; end if;
  if new.kind in ('r1', 'r2', 'ex') and (new.value < 0 or new.value > 100) then raise exception 'Рубеж и экзамен — от 0 до 100'; end if;
  if auth.uid() is not null and not public.mf_is_admin() and new.kind in ('r1', 'r2', 'ex') then
    begin
      select (value->>'start')::date into v_start from public.mf_settings where key = 'semester';
    exception when others then v_start := null;
    end;
    if v_start is not null then
      if new.kind = 'r1' and v_today < v_start + 56 then
        raise exception 'Рубеж 1 откроется %', to_char(v_start + 56, 'DD.MM.YYYY');
      end if;
      if new.kind in ('r2', 'ex') and v_today < v_start + 112 then
        raise exception 'Рубеж 2 и экзамен откроются %', to_char(v_start + 112, 'DD.MM.YYYY');
      end if;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists mf_guard_grade on public.grades;
create trigger mf_guard_grade before insert or update on public.grades
  for each row execute function public.mf_guard_grade();

-- Создаёт пару политик «разрешающая + ограничивающая» с одним условием.
create or replace function public.mf_pol(p_table text, p_cmd text, p_using text, p_check text)
returns void language plpgsql as $$
declare n text := 'mf ' || p_table || ' ' || lower(p_cmd);
begin
  execute format('alter table public.%I enable row level security', p_table);
  execute format('drop policy if exists %I on public.%I', n, p_table);
  execute format('drop policy if exists %I on public.%I', n || ' strict', p_table);
  if p_cmd = 'INSERT' then
    execute format('create policy %I on public.%I for insert to authenticated with check (%s)', n, p_table, p_check);
    execute format('create policy %I on public.%I as restrictive for insert to authenticated with check (%s)', n || ' strict', p_table, p_check);
  elsif p_cmd = 'UPDATE' then
    execute format('create policy %I on public.%I for update to authenticated using (%s) with check (%s)', n, p_table, p_using, p_check);
    execute format('create policy %I on public.%I as restrictive for update to authenticated using (%s) with check (%s)', n || ' strict', p_table, p_using, p_check);
  else
    execute format('create policy %I on public.%I for %s to authenticated using (%s)', n, p_table, lower(p_cmd), p_using);
    execute format('create policy %I on public.%I as restrictive for %s to authenticated using (%s)', n || ' strict', p_table, lower(p_cmd), p_using);
  end if;
end $$;
revoke all on function public.mf_pol(text, text, text, text) from public, anon, authenticated;

-- профили: свой профиль видят все, остальных — только подтверждённые пользователи
do $$ begin
  perform public.mf_pol('profiles', 'SELECT', 'id = auth.uid() or public.mf_is_member()', null);
  perform public.mf_pol('profiles', 'UPDATE', 'id = auth.uid() or public.mf_is_admin()', 'id = auth.uid() or public.mf_is_admin()');
  perform public.mf_pol('profiles', 'DELETE', 'public.mf_is_admin()', null);
  -- предметы
  perform public.mf_pol('subjects', 'SELECT', 'public.mf_is_member()', null);
  perform public.mf_pol('subjects', 'INSERT', null, 'public.mf_is_admin()');
  perform public.mf_pol('subjects', 'UPDATE', 'public.mf_is_admin() or public.mf_teaches(id)', 'public.mf_is_admin() or public.mf_teaches(id)');
  perform public.mf_pol('subjects', 'DELETE', 'public.mf_is_admin()', null);
  -- списки студентов по предметам
  perform public.mf_pol('enrollments', 'SELECT', 'public.mf_is_admin() or public.mf_teaches(subject_id) or (student_id = auth.uid() and public.mf_is_member())', null);
  perform public.mf_pol('enrollments', 'INSERT', null, 'public.mf_is_admin() or public.mf_teaches(subject_id)');
  perform public.mf_pol('enrollments', 'UPDATE', 'public.mf_is_admin() or public.mf_teaches(subject_id)', 'public.mf_is_admin() or public.mf_teaches(subject_id)');
  perform public.mf_pol('enrollments', 'DELETE', 'public.mf_is_admin() or public.mf_teaches(subject_id)', null);
  -- баллы: студент видит только свои, преподаватель — только по своим предметам
  perform public.mf_pol('grades', 'SELECT', 'public.mf_is_admin() or public.mf_teaches(subject_id) or (student_id = auth.uid() and public.mf_is_member())', null);
  perform public.mf_pol('grades', 'INSERT', null, 'public.mf_is_admin() or public.mf_teaches(subject_id)');
  perform public.mf_pol('grades', 'UPDATE', 'public.mf_is_admin() or public.mf_teaches(subject_id)', 'public.mf_is_admin() or public.mf_teaches(subject_id)');
  perform public.mf_pol('grades', 'DELETE', 'public.mf_is_admin() or public.mf_teaches(subject_id)', null);
  -- чат: комнаты и сообщения видят только участники
  perform public.mf_pol('rooms', 'SELECT', 'public.mf_room_ok(id::text)', null);
  perform public.mf_pol('rooms', 'INSERT', null, 'public.mf_is_member() and coalesce(created_by, auth.uid()) = auth.uid()');
  perform public.mf_pol('rooms', 'UPDATE', 'public.mf_is_admin() or public.mf_room_owner(id)', 'public.mf_is_admin() or public.mf_room_owner(id)');
  perform public.mf_pol('rooms', 'DELETE', 'public.mf_is_admin() or (public.mf_room_owner(id) and not is_general)', null);
  perform public.mf_pol('room_members', 'SELECT', 'public.mf_room_ok(room_id::text)', null);
  perform public.mf_pol('room_members', 'INSERT', null, 'public.mf_is_admin() or public.mf_room_owner(room_id)');
  perform public.mf_pol('room_members', 'UPDATE', 'public.mf_is_admin()', 'public.mf_is_admin()');
  perform public.mf_pol('room_members', 'DELETE', 'public.mf_is_admin() or public.mf_room_owner(room_id) or (user_id = auth.uid() and public.mf_is_member())', null);
  perform public.mf_pol('messages', 'SELECT', 'public.mf_room_ok(room_id::text)', null);
  perform public.mf_pol('messages', 'INSERT', null, 'public.mf_room_ok(room_id::text) and user_id = auth.uid()');
  perform public.mf_pol('messages', 'UPDATE', 'public.mf_is_admin() or (user_id = auth.uid() and public.mf_is_member())', 'public.mf_is_admin() or (user_id = auth.uid() and public.mf_is_member())');
  perform public.mf_pol('messages', 'DELETE', 'public.mf_is_admin() or (user_id = auth.uid() and public.mf_is_member())', null);
end $$;
-- гостям (без входа) эти таблицы не нужны
revoke all on public.profiles, public.subjects, public.enrollments, public.grades,
  public.rooms, public.room_members, public.messages, public.mf_settings from anon;

-- ---------- 6. Создание аккаунта администратором ----------
-- Аккаунт создаётся прямо в базе: без писем и без лимитов Supabase на регистрацию.
create or replace function public.mf_admin_create_user(
  p_login text, p_password text, p_full_name text, p_role text, p_dept int, p_grp text
) returns uuid
language plpgsql security definer set search_path = public as $$
declare v_id uuid := gen_random_uuid(); v_email text; c text;
begin
  if not public.mf_is_admin() then raise exception 'Нет прав'; end if;
  p_login := lower(trim(coalesce(p_login, '')));
  if p_login !~ '^[a-z0-9._-]{3,30}$' then raise exception 'Логин: латинские буквы, цифры, точка, дефис; 3–30 символов'; end if;
  if length(coalesce(p_password, '')) < 8 then raise exception 'Пароль — минимум 8 символов'; end if;
  if p_role not in ('student', 'teacher', 'admin') then raise exception 'Неверная роль'; end if;
  if trim(coalesce(p_full_name, '')) = '' then raise exception 'Укажите ФИО'; end if;
  v_email := p_login || '@mf.example.com';
  if exists (select 1 from auth.users where lower(email) = v_email)
     or exists (select 1 from public.profiles where lower(login) = p_login) then
    raise exception 'Такой логин уже занят: %', p_login;
  end if;
  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values ('00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated', v_email,
          extensions.crypt(p_password, extensions.gen_salt('bf')), now(),
          '{"provider":"email","providers":["email"]}'::jsonb,
          jsonb_build_object('full_name', trim(p_full_name)), now(), now());
  -- служебные поля входа должны быть пустой строкой, а не NULL
  for c in select column_name from information_schema.columns
           where table_schema = 'auth' and table_name = 'users'
             and column_name in ('confirmation_token', 'recovery_token', 'email_change_token_new', 'email_change',
                                 'email_change_token_current', 'phone_change', 'phone_change_token', 'reauthentication_token')
  loop
    execute format('update auth.users set %I = coalesce(%I, %L) where id = $1', c, c, '') using v_id;
  end loop;
  if exists (select 1 from information_schema.columns
             where table_schema = 'auth' and table_name = 'identities' and column_name = 'provider_id') then
    insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (v_id::text, v_id, jsonb_build_object('sub', v_id::text, 'email', v_email, 'email_verified', true),
            'email', now(), now(), now());
  else
    execute 'insert into auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
             values ($1, $2, $3, $4, now(), now(), now())'
      using v_id::text, v_id, jsonb_build_object('sub', v_id::text, 'email', v_email), 'email';
  end if;
  perform public.mf_admin_setup_user(v_id, p_login, trim(p_full_name), p_role, p_dept, p_grp);
  return v_id;
end $$;
revoke all on function public.mf_admin_create_user(text, text, text, text, int, text) from public, anon;
grant execute on function public.mf_admin_create_user(text, text, text, text, int, text) to authenticated;
grant execute on function public.mf_teaches(bigint) to authenticated;
grant execute on function public.mf_room_owner(bigint) to authenticated;

select 'Готово: обновление 2' as result;

-- Обновление 2, часть 3 из 3. Вставьте ВЕСЬ текст и нажмите Run.
-- Последняя строка должна быть: Готово: часть 3 из 3

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

select 'Готово: часть 3 из 3' as result;

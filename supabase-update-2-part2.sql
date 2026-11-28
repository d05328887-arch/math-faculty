-- Обновление 2, часть 2 из 3. Вставьте ВЕСЬ текст и нажмите Run.
-- Последняя строка должна быть: Готово: часть 2 из 3

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

select 'Готово: часть 2 из 3' as result;

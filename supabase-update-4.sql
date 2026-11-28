-- Обновление 4: предметы групп из расписания и несколько преподавателей у предмета.
-- Вставьте ВЕСЬ текст и нажмите Run. Последняя строка выводит «Готово: обновление 4».

alter table public.subjects add column if not exists grp text;
alter table public.subjects add column if not exists teachers text[] not null default '{}';
alter table public.subjects add column if not exists teacher_ids uuid[] not null default '{}';
create index if not exists mf_subjects_grp on public.subjects (grp);

-- Преподаватель предмета: основной или любой из преподавателей группы по расписанию.
create or replace function public.mf_teaches(p_subject bigint) returns boolean
language sql stable security definer set search_path = public as $$
  select public.mf_is_member() and exists (
    select 1 from public.subjects s
    where s.id = p_subject and (s.teacher_id = auth.uid() or auth.uid() = any (s.teacher_ids))
  );
$$;

-- Преподаватель меняет у своего предмета только силлабус; остальное — администратор.
create or replace function public.mf_guard_subject() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.mf_is_admin() then
    if new.name is distinct from old.name or new.dept is distinct from old.dept
       or new.teacher_id is distinct from old.teacher_id or new.id is distinct from old.id
       or new.grp is distinct from old.grp or new.teachers is distinct from old.teachers
       or new.teacher_ids is distinct from old.teacher_ids then
      raise exception 'Преподаватель может менять только силлабус';
    end if;
  end if;
  return new;
end $$;

select 'Готово: обновление 4' as result;

-- Обновление 3: специальность студента. Вставьте ВЕСЬ текст и нажмите Run.
-- Последняя строка выводит «Готово: обновление 3».

alter table public.profiles add column if not exists spec text;

-- Роль, кафедру, группу, специальность, логин и пометку «удалён» меняет только администратор.
create or replace function public.mf_guard_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.mf_is_admin() then
    if new.blocked is distinct from old.blocked then
      raise exception 'Только администратор может удалять пользователей';
    end if;
    if new.role is distinct from old.role or new.login is distinct from old.login
       or new.dept is distinct from old.dept or new.grp is distinct from old.grp
       or new.spec is distinct from old.spec or new.id is distinct from old.id then
      raise exception 'Эти данные меняет только администратор';
    end if;
  end if;
  return new;
end $$;

select 'Готово: обновление 3' as result;

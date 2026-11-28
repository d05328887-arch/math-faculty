-- Обновление 2, часть 1 из 3. Вставьте ВЕСЬ текст и нажмите Run.
-- Последняя строка должна быть: Готово: часть 1 из 3

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

select 'Готово: часть 1 из 3' as result;

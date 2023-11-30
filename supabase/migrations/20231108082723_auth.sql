alter table "public"."Profiles" add column "Email" text not null;

alter table "public"."Profiles" alter column "Name" set not null;

set check_function_bodies = off;

create or replace function public.handle_new_user()
 returns trigger
 language plpgsql
 security definer
as $$
begin
  insert into public."Profiles"("ProfileID", "Name", "Email")
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'New User'),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

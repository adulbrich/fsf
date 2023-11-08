alter table "public"."Profiles" add column "Email" text not null;

alter table "public"."Profiles" alter column "Name" set not null;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $$
begin
  insert into public."Profiles"("ProfileID", "Name", "Email")
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'email');

  return new;
end;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
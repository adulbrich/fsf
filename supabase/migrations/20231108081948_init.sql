create type "public"."ActivityTypes" as enum ('Steps', 'Distance');

create type "public"."activitytypes" as enum ('Steps', 'Distance');

create table "public"."ActivityProgress" (
    "ActivityProgressID" uuid not null default gen_random_uuid(),
    "CreatedAt" timestamp with time zone not null default now(),
    "UpdatedAt" timestamp with time zone not null default now(),
    "RawProgress" bigint,
    "CreatedByProfileID" uuid not null,
    "BelongsToTeamID" uuid not null,
    "ActivityType" activitytypes not null
);


alter table "public"."ActivityProgress" enable row level security;

create table "public"."Events" (
    "EventID" uuid not null default gen_random_uuid(),
    "CreatedAt" timestamp with time zone not null default now(),
    "UpdatedAt" timestamp with time zone not null default now(),
    "Name" text not null,
    "Type" "ActivityTypes" not null,
    "CreatedByUserID" uuid not null,
    "StartsAt" timestamp with time zone not null,
    "EndsAt" timestamp with time zone not null
);


alter table "public"."Events" enable row level security;

create table "public"."Profiles" (
    "ProfileID" uuid not null,
    "CreatedAt" timestamp with time zone not null default now(),
    "UpdatedAt" timestamp with time zone not null default now(),
    "Name" text
);


alter table "public"."Profiles" enable row level security;

create table "public"."Teams" (
    "TeamID" uuid not null default gen_random_uuid(),
    "CreatedAt" timestamp with time zone not null default now(),
    "UpdatedAt" timestamp with time zone not null default now(),
    "Name" text not null,
    "BelongsToEventID" uuid not null
);


alter table "public"."Teams" enable row level security;

create table "public"."TeamsProfiles" (
    "TeamID" uuid not null,
    "ProfileID" uuid not null
);


alter table "public"."TeamsProfiles" enable row level security;

CREATE UNIQUE INDEX "ActivityProgress_pkey" ON public."ActivityProgress" USING btree ("ActivityProgressID");

CREATE UNIQUE INDEX "Events_pkey" ON public."Events" USING btree ("EventID");

CREATE UNIQUE INDEX "Profiles_pkey" ON public."Profiles" USING btree ("ProfileID");

CREATE UNIQUE INDEX "TeamsProfiles_pkey" ON public."TeamsProfiles" USING btree ("TeamID", "ProfileID");

CREATE UNIQUE INDEX "Teams_pkey" ON public."Teams" USING btree ("TeamID");

alter table "public"."ActivityProgress" add constraint "ActivityProgress_pkey" PRIMARY KEY using index "ActivityProgress_pkey";

alter table "public"."Events" add constraint "Events_pkey" PRIMARY KEY using index "Events_pkey";

alter table "public"."Profiles" add constraint "Profiles_pkey" PRIMARY KEY using index "Profiles_pkey";

alter table "public"."Teams" add constraint "Teams_pkey" PRIMARY KEY using index "Teams_pkey";

alter table "public"."TeamsProfiles" add constraint "TeamsProfiles_pkey" PRIMARY KEY using index "TeamsProfiles_pkey";

alter table "public"."ActivityProgress" add constraint "ActivityProgress_BelongsToTeamID_fkey" FOREIGN KEY ("BelongsToTeamID") REFERENCES "Teams"("TeamID") not valid;

alter table "public"."ActivityProgress" validate constraint "ActivityProgress_BelongsToTeamID_fkey";

alter table "public"."ActivityProgress" add constraint "ActivityProgress_CreatedByProfileID_fkey" FOREIGN KEY ("CreatedByProfileID") REFERENCES "Profiles"("ProfileID") not valid;

alter table "public"."ActivityProgress" validate constraint "ActivityProgress_CreatedByProfileID_fkey";

alter table "public"."Events" add constraint "Events_CreatedByUserID_fkey" FOREIGN KEY ("CreatedByUserID") REFERENCES "Profiles"("ProfileID") not valid;

alter table "public"."Events" validate constraint "Events_CreatedByUserID_fkey";

alter table "public"."Profiles" add constraint "Profiles_ProfileID_fkey" FOREIGN KEY ("ProfileID") REFERENCES auth.users(id) not valid;

alter table "public"."Profiles" validate constraint "Profiles_ProfileID_fkey";

alter table "public"."Teams" add constraint "Team_BelongsToEventID_fkey" FOREIGN KEY ("BelongsToEventID") REFERENCES "Events"("EventID") not valid;

alter table "public"."Teams" validate constraint "Team_BelongsToEventID_fkey";

alter table "public"."TeamsProfiles" add constraint "TeamsProfiles_ProfileID_fkey" FOREIGN KEY ("ProfileID") REFERENCES "Profiles"("ProfileID") not valid;

alter table "public"."TeamsProfiles" validate constraint "TeamsProfiles_ProfileID_fkey";

alter table "public"."TeamsProfiles" add constraint "TeamsProfiles_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Teams"("TeamID") not valid;

alter table "public"."TeamsProfiles" validate constraint "TeamsProfiles_TeamID_fkey";

create or replace view "public"."ProfileStats" as  SELECT "Profiles"."ProfileID",
    "Profiles"."Name",
    ( SELECT sum(
                CASE
                    WHEN (ap."ActivityType" = 'Steps'::activitytypes) THEN ap."RawProgress"
                    WHEN (ap."ActivityType" = 'Distance'::activitytypes) THEN (ap."RawProgress" * 2500)
                    ELSE NULL::bigint
                END) AS sum
           FROM "ActivityProgress" ap
          WHERE ("Profiles"."ProfileID" = ap."CreatedByProfileID")) AS "TotalScore"
   FROM "Profiles";


create or replace view "public"."TeamStats" as  SELECT "Teams"."TeamID",
    "Teams"."Name",
    "Teams"."BelongsToEventID",
    ( SELECT sum(
                CASE
                    WHEN (ap."ActivityType" = 'Steps'::activitytypes) THEN ap."RawProgress"
                    WHEN (ap."ActivityType" = 'Distance'::activitytypes) THEN (ap."RawProgress" * 2500)
                    ELSE NULL::bigint
                END) AS sum
           FROM "ActivityProgress" ap
          WHERE ("Teams"."TeamID" = ap."BelongsToTeamID")) AS "TotalScore"
   FROM "Teams";


create or replace view "public"."EventStats" as  SELECT "Events"."EventID",
    "Events"."Name",
    ( SELECT sum(ts."TotalScore") AS sum
           FROM "TeamStats" ts
          WHERE ("Events"."EventID" = ts."BelongsToEventID")) AS "TotalScore"
   FROM "Events";




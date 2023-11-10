
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."ActivityTypes" AS ENUM (
    'Steps',
    'Distance'
);

ALTER TYPE "public"."ActivityTypes" OWNER TO "postgres";

CREATE TYPE "public"."activitytypes" AS ENUM (
    'Steps',
    'Distance'
);

ALTER TYPE "public"."activitytypes" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."ActivityProgress" (
    "ActivityProgressID" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "CreatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "UpdatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "RawProgress" bigint,
    "CreatedByProfileID" "uuid" NOT NULL,
    "BelongsToTeamID" "uuid" NOT NULL,
    "ActivityType" "public"."activitytypes" NOT NULL
);

ALTER TABLE "public"."ActivityProgress" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Events" (
    "EventID" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "CreatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "UpdatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "Name" "text" NOT NULL,
    "Type" "public"."ActivityTypes" NOT NULL,
    "CreatedByUserID" "uuid" NOT NULL,
    "StartsAt" timestamp with time zone NOT NULL,
    "EndsAt" timestamp with time zone NOT NULL
);

ALTER TABLE "public"."Events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Teams" (
    "TeamID" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "CreatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "UpdatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "Name" "text" NOT NULL,
    "BelongsToEventID" "uuid" NOT NULL
);

ALTER TABLE "public"."Teams" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."TeamStats" AS
 SELECT "Teams"."TeamID",
    "Teams"."Name",
    "Teams"."BelongsToEventID",
    ( SELECT "sum"(
                CASE
                    WHEN ("ap"."ActivityType" = 'Steps'::"public"."activitytypes") THEN "ap"."RawProgress"
                    WHEN ("ap"."ActivityType" = 'Distance'::"public"."activitytypes") THEN ("ap"."RawProgress" * 2500)
                    ELSE NULL::bigint
                END) AS "sum"
           FROM "public"."ActivityProgress" "ap"
          WHERE ("Teams"."TeamID" = "ap"."BelongsToTeamID")) AS "TotalScore"
   FROM "public"."Teams";

ALTER TABLE "public"."TeamStats" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."EventStats" AS
 SELECT "Events"."EventID",
    "Events"."Name",
    ( SELECT "sum"("ts"."TotalScore") AS "sum"
           FROM "public"."TeamStats" "ts"
          WHERE ("Events"."EventID" = "ts"."BelongsToEventID")) AS "TotalScore"
   FROM "public"."Events";

ALTER TABLE "public"."EventStats" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Profiles" (
    "ProfileID" "uuid" NOT NULL,
    "CreatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "UpdatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "Name" "text"
);

ALTER TABLE "public"."Profiles" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."ProfileStats" AS
 SELECT "Profiles"."ProfileID",
    "Profiles"."Name",
    ( SELECT "sum"(
                CASE
                    WHEN ("ap"."ActivityType" = 'Steps'::"public"."activitytypes") THEN "ap"."RawProgress"
                    WHEN ("ap"."ActivityType" = 'Distance'::"public"."activitytypes") THEN ("ap"."RawProgress" * 2500)
                    ELSE NULL::bigint
                END) AS "sum"
           FROM "public"."ActivityProgress" "ap"
          WHERE ("Profiles"."ProfileID" = "ap"."CreatedByProfileID")) AS "TotalScore"
   FROM "public"."Profiles";

ALTER TABLE "public"."ProfileStats" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."TeamsProfiles" (
    "TeamID" "uuid" NOT NULL,
    "ProfileID" "uuid" NOT NULL
);

ALTER TABLE "public"."TeamsProfiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."ActivityProgress"
    ADD CONSTRAINT "ActivityProgress_pkey" PRIMARY KEY ("ActivityProgressID");

ALTER TABLE ONLY "public"."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("EventID");

ALTER TABLE ONLY "public"."Profiles"
    ADD CONSTRAINT "Profiles_pkey" PRIMARY KEY ("ProfileID");

ALTER TABLE ONLY "public"."TeamsProfiles"
    ADD CONSTRAINT "TeamsProfiles_pkey" PRIMARY KEY ("TeamID", "ProfileID");

ALTER TABLE ONLY "public"."Teams"
    ADD CONSTRAINT "Teams_pkey" PRIMARY KEY ("TeamID");

ALTER TABLE ONLY "public"."ActivityProgress"
    ADD CONSTRAINT "ActivityProgress_BelongsToTeamID_fkey" FOREIGN KEY ("BelongsToTeamID") REFERENCES "public"."Teams"("TeamID");

ALTER TABLE ONLY "public"."ActivityProgress"
    ADD CONSTRAINT "ActivityProgress_CreatedByProfileID_fkey" FOREIGN KEY ("CreatedByProfileID") REFERENCES "public"."Profiles"("ProfileID");

ALTER TABLE ONLY "public"."Events"
    ADD CONSTRAINT "Events_CreatedByUserID_fkey" FOREIGN KEY ("CreatedByUserID") REFERENCES "public"."Profiles"("ProfileID");

ALTER TABLE ONLY "public"."Profiles"
    ADD CONSTRAINT "Profiles_ProfileID_fkey" FOREIGN KEY ("ProfileID") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."Teams"
    ADD CONSTRAINT "Team_BelongsToEventID_fkey" FOREIGN KEY ("BelongsToEventID") REFERENCES "public"."Events"("EventID");

ALTER TABLE ONLY "public"."TeamsProfiles"
    ADD CONSTRAINT "TeamsProfiles_ProfileID_fkey" FOREIGN KEY ("ProfileID") REFERENCES "public"."Profiles"("ProfileID");

ALTER TABLE ONLY "public"."TeamsProfiles"
    ADD CONSTRAINT "TeamsProfiles_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "public"."Teams"("TeamID");

ALTER TABLE "public"."ActivityProgress" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Teams" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."TeamsProfiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."ActivityProgress" TO "anon";
GRANT ALL ON TABLE "public"."ActivityProgress" TO "authenticated";
GRANT ALL ON TABLE "public"."ActivityProgress" TO "service_role";

GRANT ALL ON TABLE "public"."Events" TO "anon";
GRANT ALL ON TABLE "public"."Events" TO "authenticated";
GRANT ALL ON TABLE "public"."Events" TO "service_role";

GRANT ALL ON TABLE "public"."Teams" TO "anon";
GRANT ALL ON TABLE "public"."Teams" TO "authenticated";
GRANT ALL ON TABLE "public"."Teams" TO "service_role";

GRANT ALL ON TABLE "public"."TeamStats" TO "anon";
GRANT ALL ON TABLE "public"."TeamStats" TO "authenticated";
GRANT ALL ON TABLE "public"."TeamStats" TO "service_role";

GRANT ALL ON TABLE "public"."EventStats" TO "anon";
GRANT ALL ON TABLE "public"."EventStats" TO "authenticated";
GRANT ALL ON TABLE "public"."EventStats" TO "service_role";

GRANT ALL ON TABLE "public"."Profiles" TO "anon";
GRANT ALL ON TABLE "public"."Profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."Profiles" TO "service_role";

GRANT ALL ON TABLE "public"."ProfileStats" TO "anon";
GRANT ALL ON TABLE "public"."ProfileStats" TO "authenticated";
GRANT ALL ON TABLE "public"."ProfileStats" TO "service_role";

GRANT ALL ON TABLE "public"."TeamsProfiles" TO "anon";
GRANT ALL ON TABLE "public"."TeamsProfiles" TO "authenticated";
GRANT ALL ON TABLE "public"."TeamsProfiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

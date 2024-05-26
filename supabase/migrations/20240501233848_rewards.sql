alter table "public"."Events" add column "RewardPlural" text not null default 'Leaves'::text;

alter table "public"."Events" add column "RewardSingular" text not null default 'Leaf'::text;

alter table "public"."Events" add column "RewardTierOneThreshold" integer not null default 2000;

alter table "public"."Events" add column "RewardTierThreeThreshold" integer not null default 7000;

alter table "public"."Events" add column "RewardTierTwoThreshold" integer not null default 4000;
-- Create a test user for dev use
select utils.create_user('amy@testuser.com', 'damfit');

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg20.04+1)

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

-- Disable triggers
SET session_replication_role = replica;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'e67ee9da-e89d-445e-838c-d6ae461b1d07', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"fikes@oregonstate.edu","user_id":"df3cb711-d4ac-418d-9ee9-83efe5a289ae","user_phone":""}}', '2023-10-26 00:59:22.569871+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff53bf96-08b6-485d-a1e8-1277ae96ef47', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"fikes+2@oregonstate.edu","user_id":"f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f","user_phone":""}}', '2023-10-26 00:59:33.840648+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ddd6083-c507-49cc-92e4-babd138fc5bf', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"fikes+3@oregonstate.edu","user_id":"d708f318-0a31-43f5-addd-095c527673ed","user_phone":""}}', '2023-10-26 00:59:53.814202+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', 'authenticated', 'authenticated', 'fikes@oregonstate.edu', '$2a$10$rPB18qnnnGG/T.D/KidheOtaIjlUoYL6Zzt4i1jySFD2P/MyGwexe', '2023-10-26 00:59:22.571555+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-26 00:59:22.562115+00', '2023-10-26 00:59:22.574095+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', 'f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f', 'authenticated', 'authenticated', 'fikes+2@oregonstate.edu', '$2a$10$x/p67DaP209DQW6pjYwMQuJOyfY81hPbuHLcWRt.Zklp3RfEYGhwW', '2023-10-26 00:59:33.841829+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-26 00:59:33.838741+00', '2023-10-26 00:59:33.842036+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', 'd708f318-0a31-43f5-addd-095c527673ed', 'authenticated', 'authenticated', 'fikes+3@oregonstate.edu', '$2a$10$Bq5JKZsG2GoCxST1PUXVJOJuWpnZGGCHW2iabjThw0pzkjfHa7vom', '2023-10-26 00:59:53.815174+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-26 00:59:53.812547+00', '2023-10-26 00:59:53.81537+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES
	('df3cb711-d4ac-418d-9ee9-83efe5a289ae', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '{"sub": "df3cb711-d4ac-418d-9ee9-83efe5a289ae", "email": "fikes@oregonstate.edu"}', 'email', '2023-10-26 00:59:22.568597+00', '2023-10-26 00:59:22.568647+00', '2023-10-26 00:59:22.568647+00'),
	('f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f', 'f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f', '{"sub": "f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f", "email": "fikes+2@oregonstate.edu"}', 'email', '2023-10-26 00:59:33.839758+00', '2023-10-26 00:59:33.839804+00', '2023-10-26 00:59:33.839804+00'),
	('d708f318-0a31-43f5-addd-095c527673ed', 'd708f318-0a31-43f5-addd-095c527673ed', '{"sub": "d708f318-0a31-43f5-addd-095c527673ed", "email": "fikes+3@oregonstate.edu"}', 'email', '2023-10-26 00:59:53.813487+00', '2023-10-26 00:59:53.813526+00', '2023-10-26 00:59:53.813526+00');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: Profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Profiles" ("ProfileID", "CreatedAt", "UpdatedAt", "Name", "Email") VALUES
	('df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-10-26 01:00:39.247643+00', '2023-10-26 01:00:39.247643+00', 'Stephen', 'fikes@oregonstate.edu'),
	('f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f', '2023-10-26 01:00:48.921172+00', '2023-10-26 01:00:48.921172+00', 'Jeremy', 'fikes+2@oregonstate.edu'),
	('d708f318-0a31-43f5-addd-095c527673ed', '2023-10-26 01:00:56.203421+00', '2023-10-26 01:00:56.203421+00', 'Stan', 'fikes+3@oregonstate.edu');


--
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Events" ("EventID", "CreatedAt", "UpdatedAt", "Name", "Type", "CreatedByUserID", "StartsAt", "EndsAt") VALUES
	('00981168-c525-466b-997c-3d8ab72a610d', '2023-10-26 01:01:43.197519+00', '2023-10-26 01:01:43.197519+00', 'Only Steps', 'Steps', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-10-23 01:01:37+00', '2023-10-29 01:01:41+00'),
	('6615ed49-13c3-413d-b1f4-0be13d6bc837', '2023-10-26 01:34:39.16545+00', '2023-10-26 01:34:39.16545+00', 'Distance-thon', 'Distance', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-10-23 01:34:35+00', '2023-10-29 01:34:36+00');


--
-- Data for Name: Teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Teams" ("TeamID", "CreatedAt", "UpdatedAt", "Name", "BelongsToEventID") VALUES
	('0e420a5b-4bed-477f-a8f1-41a7f24b98fe', '2023-10-26 01:07:35.782847+00', '2023-10-26 01:07:35.782847+00', 'Big Steppers', '00981168-c525-466b-997c-3d8ab72a610d'),
	('6bfb8e4d-7a52-4b42-acd9-3a56ceef1b27', '2023-10-26 01:08:05.669602+00', '2023-10-26 01:08:05.669602+00', 'Stan the Man', '00981168-c525-466b-997c-3d8ab72a610d'),
	('eee6fd13-fc22-4269-a873-5032be404436', '2023-10-26 01:35:33.68709+00', '2023-10-26 01:35:33.68709+00', 'Walkie Talkies', '6615ed49-13c3-413d-b1f4-0be13d6bc837');


--
-- Data for Name: ActivityProgress; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."ActivityProgress" ("ActivityProgressID", "CreatedAt", "UpdatedAt", "RawProgress", "CreatedByProfileID", "BelongsToTeamID", "ActivityType") VALUES
	('6646318b-614a-4810-9a96-b6452bd28c3a', '2023-10-26 01:08:56.359911+00', '2023-10-26 01:08:56.359911+00', 233, 'd708f318-0a31-43f5-addd-095c527673ed', '6bfb8e4d-7a52-4b42-acd9-3a56ceef1b27', 'Steps'),
	('3253ca94-4727-4b54-9cfc-8043503b9fac', '2023-10-26 01:09:10.965271+00', '2023-10-26 01:09:10.965271+00', 516, 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '0e420a5b-4bed-477f-a8f1-41a7f24b98fe', 'Steps'),
	('1c4069ac-85a4-4657-8ccf-64c845cc09f2', '2023-10-26 01:09:25.833278+00', '2023-10-26 01:09:25.833278+00', 159, 'f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f', '0e420a5b-4bed-477f-a8f1-41a7f24b98fe', 'Steps'),
	('c37460dc-12c7-4a80-acbe-e921b856a82c', '2023-10-26 01:09:43.02073+00', '2023-10-26 01:09:43.02073+00', 966, 'd708f318-0a31-43f5-addd-095c527673ed', '6bfb8e4d-7a52-4b42-acd9-3a56ceef1b27', 'Steps'),
	('61a80fea-f5cd-4d12-b8f6-f5da600e147a', '2023-10-26 01:10:02.72539+00', '2023-10-26 01:10:02.72539+00', 201, 'f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f', '0e420a5b-4bed-477f-a8f1-41a7f24b98fe', 'Steps'),
	('cb997d05-af3c-4aa7-8b09-5de5da942d82', '2023-10-26 01:37:21.515587+00', '2023-10-26 01:37:21.515587+00', 1, 'd708f318-0a31-43f5-addd-095c527673ed', 'eee6fd13-fc22-4269-a873-5032be404436', 'Distance'),
	('e1fe6c27-90d7-4ea6-8b1c-13e94b615a38', '2023-10-26 02:23:04.024732+00', '2023-10-26 02:23:04.024732+00', 100, 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '0e420a5b-4bed-477f-a8f1-41a7f24b98fe', 'Steps');


--
-- Data for Name: TeamsProfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."TeamsProfiles" ("TeamID", "ProfileID") VALUES
	('0e420a5b-4bed-477f-a8f1-41a7f24b98fe', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae'),
	('6bfb8e4d-7a52-4b42-acd9-3a56ceef1b27', 'd708f318-0a31-43f5-addd-095c527673ed'),
	('0e420a5b-4bed-477f-a8f1-41a7f24b98fe', 'f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f'),
	('eee6fd13-fc22-4269-a873-5032be404436', 'd708f318-0a31-43f5-addd-095c527673ed');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;

-- Enable triggers
SET session_replication_role = DEFAULT;
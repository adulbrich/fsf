-- Create a test user for dev use
select utils.create_user('amy@test.com', 'damfit');
SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
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

INSERT INTO "public"."Profiles" ("ProfileID", "CreatedAt", "UpdatedAt", "Name") VALUES
	('df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-10-26 01:00:39.247643+00', '2023-10-26 01:00:39.247643+00', 'Stephen'),
	('f1c2c14d-7cb8-4a1b-9ad2-1312fed3ad2f', '2023-10-26 01:00:48.921172+00', '2023-10-26 01:00:48.921172+00', 'Jeremy'),
	('d708f318-0a31-43f5-addd-095c527673ed', '2023-10-26 01:00:56.203421+00', '2023-10-26 01:00:56.203421+00', 'Stan'),
	('5c89889f-71f0-43ab-b382-b3b94c292054', '2024-01-30 00:48:04.957377+00', '2024-01-30 00:48:04.957377+00', 'Amy');


--
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Events" ("EventID", "CreatedAt", "UpdatedAt", "Name", "Type", "CreatedByUserID", "StartsAt", "EndsAt", "Description") VALUES
	('00981168-c525-466b-997c-3d8ab72a610d', '2023-10-26 01:01:43.197519+00', '2023-10-26 01:01:43.197519+00', 'Only Steps', 'Steps', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-10-23 01:01:37+00', '2023-10-29 01:01:41+00', 'Embark on a fitness journey where every movement counts. In the "Only Steps" event, participants challenge themselves to take only steps throughout the course. Whether it''s a brisk walk or a light jog, every step contributes to a healthier lifestyle, making this event a celebration of physical activity and personal progress.'),
	('6615ed49-13c3-413d-b1f4-0be13d6bc837', '2023-10-26 01:34:39.16545+00', '2023-10-26 01:34:39.16545+00', 'Distance-thon', 'Distance', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-10-23 01:34:35+00', '2023-10-29 01:34:36+00', 'Lace up your sneakers for the Distance-thon, a challenge that pushes participants to cover as much ground as possible. Whether walking, running, or a combination of both, this event measures success by the distance covered. It''s a test of endurance and determination as participants strive to reach their personal bests or conquer a set distance goal.'),
	('67884941-0a70-4ee9-81d0-b5a929316f38', '2023-12-08 23:50:54.597225+00', '2023-12-08 23:50:54.597225+00', 'Walk of the Century', 'Steps', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2024-01-01 23:50:33+00', '2024-12-31 23:50:39+00', 'Step into the past with the Walk of the Century, a historical journey on foot. Participants explore significant landmarks and moments from the 20th century while enjoying a leisurely stroll. This event not only promotes physical activity but also offers a unique opportunity for participants to connect with the past in an engaging and memorable way.'),
	('7a3ad57c-9cdd-4a03-8f21-fe54da1fe772', '2023-12-09 00:08:46.306042+00', '2023-12-09 00:08:46.306042+00', 'Merry Walk-mas', 'Steps', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-12-02 00:08:40+00', '2024-01-01 00:08:43+00', 'Spread holiday cheer through motion in the Merry Walk-mas event. Participants don festive attire and embark on a spirited walk, celebrating the joy of the season. Whether it''s a winter wonderland or a sunny day, this event combines fitness and festivity, creating a memorable experience for all who participate.'),
	('e4604583-c7ca-4de2-abb2-8b74f6f7837e', '2023-12-10 01:58:06.963309+00', '2023-12-10 01:58:06.963309+00', 'Sprint to New Years', 'Distance', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-12-02 01:57:55+00', '2024-01-02 01:58:00+00', 'Gear up for an energetic transition into the new year with the Sprint to New Years event. Participants sprint towards the upcoming year, symbolizing a fresh start and a commitment to an active and healthy lifestyle. It''s a high-energy celebration that sets the tone for a year filled with fitness and positive momentum.'),
	('3938cecc-1d29-49e6-9e24-a476b29b985a', '2023-12-10 01:58:48.738297+00', '2023-12-10 01:58:48.738297+00', 'Only Go Backwards', 'Steps', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-12-07 01:58:42+00', '2023-12-22 01:58:45+00', 'Challenge your routine with the Only Go Backwards event, where participants navigate the course exclusively by moving backward. This playful and unconventional challenge adds a twist to traditional walking or running, testing coordination and agility. It''s a fun and lighthearted way to promote physical activity with a unique flair.'),
	('cdc4f0e0-19ec-418d-a5d4-90a1023a6bb6', '2023-12-10 02:51:16.907144+00', '2023-12-10 02:51:16.907144+00', 'Campus Strides', 'Steps', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2023-10-04 01:45:00+00', '2023-11-03 01:45:04+00', 'Explore the educational environment with the Campus Strides event. Participants traverse the campus, enjoying the scenery while engaging in a physical activity that promotes well-being. This event fosters a sense of community among students, faculty, and staff, emphasizing the importance of incorporating movement into the daily routine.'),
	('135f0a7e-2c35-494b-9208-e36e96bff492', '2024-01-25 02:20:09.319219+00', '2024-01-25 02:20:09.319219+00', 'Cupid Shuffle', 'Distance', 'df3cb711-d4ac-418d-9ee9-83efe5a289ae', '2024-02-02 02:19:30+00', '2024-02-15 02:19:57+00', 'Get into the rhythm of fitness and love with the Cupid Shuffle event. This lively and upbeat gathering encourages participants to dance and move in the spirit of Cupid. Whether walking, jogging, or dancing, everyone can join in the celebration of heart-healthy activities. It''s a social and heartwarming event that promotes both physical and emotional well-being.'),
	('9008d14a-5033-47c9-98f0-f4510f2e74ae', '2024-01-30 04:33:16.711159+00', '2024-01-30 04:33:16.711159+00', 'Test Event', 'Steps', '5c89889f-71f0-43ab-b382-b3b94c292054', '2024-01-31 00:00:00+00', '2024-02-10 00:00:00+00', 'This is a description.');


--
-- Data for Name: Teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Teams" ("TeamID", "CreatedAt", "UpdatedAt", "Name", "BelongsToEventID") VALUES
	('0e420a5b-4bed-477f-a8f1-41a7f24b98fe', '2023-10-26 01:07:35.782847+00', '2023-10-26 01:07:35.782847+00', 'Big Steppers', '00981168-c525-466b-997c-3d8ab72a610d'),
	('6bfb8e4d-7a52-4b42-acd9-3a56ceef1b27', '2023-10-26 01:08:05.669602+00', '2023-10-26 01:08:05.669602+00', 'Stan the Man', '00981168-c525-466b-997c-3d8ab72a610d'),
	('eee6fd13-fc22-4269-a873-5032be404436', '2023-10-26 01:35:33.68709+00', '2023-10-26 01:35:33.68709+00', 'Walkie Talkies', '6615ed49-13c3-413d-b1f4-0be13d6bc837'),
	('ed04c360-4482-4a49-ab0a-488b9214489a', '2023-12-27 11:03:13.920824+00', '2023-12-27 11:03:13.920824+00', 'Test Team 1', '00981168-c525-466b-997c-3d8ab72a610d'),
	('a64bbc77-667c-43a0-b90e-ca056acb817a', '2023-12-27 11:05:34.330584+00', '2023-12-27 11:05:34.330584+00', 'Test Team 2', '00981168-c525-466b-997c-3d8ab72a610d'),
	('58408dad-60e6-481f-9c25-1b718a199da6', '2023-12-27 11:05:44.961103+00', '2023-12-27 11:05:44.961103+00', 'Test Team 3', '00981168-c525-466b-997c-3d8ab72a610d'),
	('795908bc-5a75-49ca-97b6-eb44393a7802', '2023-12-27 11:06:23.121269+00', '2023-12-27 11:06:23.121269+00', 'Test Team 4', '00981168-c525-466b-997c-3d8ab72a610d'),
	('2dbbc286-3a49-441d-bc95-3097f079f75c', '2024-01-30 01:08:10.478267+00', '2024-01-30 01:08:10.478267+00', 'amy@test.com', '135f0a7e-2c35-494b-9208-e36e96bff492');


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
	('eee6fd13-fc22-4269-a873-5032be404436', 'd708f318-0a31-43f5-addd-095c527673ed'),
	('2dbbc286-3a49-441d-bc95-3097f079f75c', '5c89889f-71f0-43ab-b382-b3b94c292054');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('EventAssets', 'EventAssets', NULL, '2024-01-30 04:04:01.434155+00', '2024-01-30 04:04:01.434155+00', false, false, 5242880, '{image/*}', NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") VALUES
	('c0109a87-b82e-4e49-b8b9-3a5222b2bd06', 'EventAssets', 'Banners/9008d14a-5033-47c9-98f0-f4510f2e74ae', '5c89889f-71f0-43ab-b382-b3b94c292054', '2024-01-30 04:33:18.880082+00', '2024-01-30 04:33:18.880082+00', '2024-01-30 04:33:18.880082+00', '{"eTag": "\"eac1605075757e93a055a1c3834617cb\"", "size": 862598, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-01-30T04:33:19.000Z", "contentLength": 862598, "httpStatusCode": 200}', '7f47174e-e5eb-405d-a0f7-10837f66a7cb', '5c89889f-71f0-43ab-b382-b3b94c292054');


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 215, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;

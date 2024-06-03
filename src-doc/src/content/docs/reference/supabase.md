---
title: Supabase Commands 
description: Common Supabase commands.
---

### System Prerequisites
1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**NOTE**: Run these commands from the root level!

### Reset *local* database
`supabase db reset --local`

**NOTE**: Do not run this on the linked database unless you are sure.
Use the `--help` flag to find the correct flag to reset the linked database.
I will not give it outright here, since this is potentially a dangerous operation.

This will wipe the database and apply existing migrations. The
`seed.sql` file will be applied as the final step.

### Generate a database migration
`supabase db diff --linked --file {MIGRATION NAME HERE}`
* Change `--linked` to `--local` to compare existing migrations against your local database schema.

### Dump database data
`supabase db dump --linked --data-only --file supabase/seed.sql`
* Change `--linked` to `--local` to dump local database data.

### Generate TypeScript definitions
`supabase gen types typescript --linked --schema public > src-web-app/src/lib/types/supabase.ts`
* Change `--linked` to `--local` to generate definitions from local database schema.

## Local Development
When running the projects in development, they will look for a local instance of Supabase. Ensure
the local Docker verison of Supabase is running. All commands are run from the root repo folder, `/`.

A testing account exists with the email `amy@test.com` and password `damfit`.

#### Start Local Supabase
`npx supabase start`

#### Stop Local Supabase
`npx supabase stop`

#### Wipe and seed a fresh database
`npx supabase db reset`

#### View the overall status
`npx supabase status`
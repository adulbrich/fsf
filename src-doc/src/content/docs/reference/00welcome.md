---
title: Welcome 
description: How to get set up and writing code.
---

### Project Overview

Both the React Native (mobile) and SvelteKit (web) projects
use a Supabase backend. Refer to the document on [Development
Environment](/reference/dev_env) to ensure both projects communicate with the Supabase
backend.

In order to simplify the development workflow, both front-end
projects "speak" to the online managed Supabase backend by default.
Having all team members develop on local Supabase instances (via Docker)
was difficult, so this is the remedial solution.

The managed Supabase backend (and the local one) can be reset at any
time, up to the latest migration script found in `supabase/migrations`.
For specific commands and corresponding descriptions,
look at [Supabase Commands](/reference/supabase).
Reseting the Supabase backend means that the database will be wiped, all
migration scripts executed, and the database seeded according to `seed.sql`.

Once the Supabase (managed or local) instance is running and the `.env` variables set,
both front-end projects will run. Reference [Running The Project](/reference/running) for specific
commands to launch each project.
---
title: Web Code Layout
description: An overview of how the code is structured.
---

The mobile codebase is located in `osu-fsf/src-web-app`.
Paths in this document are relative to this location.

## Big ideas

`src/routes`

This is where the applications routes are stored. Folders and files within
can be accessed similar to accessing resources on a web server. The
[SvelteKit Routing docs](https://kit.svelte.dev/docs/routing)
do a good job of explaining the logic behind the structure.
Folders in parenthesis, e.g. `(auth)`, are not displayed in the pathname.

`src/lib`

Library type code lives here. This is typically code that is referenced in
many places throughout the codebase and doesn't serve a singular feature or function.
For example, `src/lib/types/supabase*.ts` houses our generated database types,
and `src/lib/images` contains static images.

`static`

Application assets (images, fonts, icons) are stored here. These can be
directly accessed from the HTML, unlike assets in `src/lib/images`.
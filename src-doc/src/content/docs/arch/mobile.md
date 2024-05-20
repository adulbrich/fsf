---
title: Mobile Code Layout
description: An overview of how the code is structured.
---

The mobile codebase is located in `osu-fsf/src-mobile-app`.
Paths in this document are relative to this location.

## Big ideas

`src/app`

This is where the applications routes are stored. Folders and files within
can be accessed similar to accessing resources on a web server. The
[Expo Router docs](https://docs.expo.dev/router/create-pages/)
do a good job of explaining the logic behind the structure.
Folders in parenthesis, e.g. `(auth)`, are not displayed in the pathname.

`src/features`

This folder houses the React Native components, which are essentially
building blocks for our application. The components are organized by
feature name within. For example, `src/features/events/EventCard.tsx`
is a component that displays a given Event in a convenient card format.

If one is unfamiliar with React as a technology, I recommend working
through React's very own [Quick Start](https://react.dev/learn) 
and creating a small demo application that uses one or two components.

`src/lib`

Library type code lives here. This is typically code that is referenced in
many places throughout the codebase and doesn't serve a singular feature or function.
For example, `src/lib/supabase*.ts` houses our generated database types, `src/lib/models.ts`
contains our frontend type definitions, and `src/lib/helpers.ts` provides small
miscellaneous code snippets.

`src/store`

This is the home for Redux, which manages and maintains our application's state.
State is essentially our app's "memory." Redux has some neat features
such as maintaining state across app restarts and effectively handling
asynchronous data requests made by the app.

For those unfamiliar, I recommend reading through the React Redux
[Quick Start](https://react-redux.js.org/tutorials/typescript-quick-start) guide
for a brief introduction.

`assets`

Application assets (images, fonts, icons) are stored here.
<img src="src-web-app/static/about/logo.png" alt="FSF Logo" width="75"/>

# Faculty Staff Fitness

## Description
FSF (Faculty Staff Fitness) is an app where users join teams and compete against other teams based on the number of steps they take. It is event-based with one event held each month. The project consists of two parts: a web application for event organizers and a mobile application for users.  We are also using Starlight for the documentation of the project.

### Make sure to install these if you haven't already:
- Node.js
- npm (Node Package Manager)



# Create .env file:
# Make sure the .env file does not get pushed to the github repo (there should already be implementation that prevents this)

    # /src-web-app/.env or /src-mobile-app/.env or 
    PUBLIC_SUPABASE_URL="https://kxxogajirafpgyapruer.supabase.co"
    PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eG9nYWppcmFmcGd5YXBydWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjIwNTksImV4cCI6MjA0NTE5ODA1OX0.rETttMwR_LeLb9d7KRablKMPbdQSVa-oFZaziCcgttg"

    PUBLIC_DEV_SUPABASE_URL="http://localhost:54321"
    PUBLIC_DEV_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eG9nYWppcmFmcGd5YXBydWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjIwNTksImV4cCI6MjA0NTE5ODA1OX0.rETttMwR_LeLb9d7KRablKMPbdQSVa-oFZaziCcgttg"




#### If Doing Web Application: 

1. Clone the repository:
    ```bash
    git clone https://github.com/OregonStateUniversity/osu-fsf.git
    ```

2. Navigate to the web app directory:
    ```bash
    cd src-web-app
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Developing

    Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

    ```bash
    npm run dev

    # or start the server and open the app in a new browser tab
    npm run dev -- --open
    ```

## Building

    To create a production version of your app:

    ```bash
    npm run build
    ```

    You can preview the production build with `npm run preview`.

    > To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.





#### If Doing Mobile Application

1. Clone the repository
    ```bash
    git clone https://github.com/OregonStateUniversity/osu-fsf.git
    ```

2. Navigate to the mobile app directory:
    ```bash
    cd src-mobile-app
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the Expo development server:
    ```bash
    npm run start
    ```

    ## Overview

    This is a [Expo](https://docs.expo.dev/) + [React Native project](https://reactnative.dev/docs/).

    The dev server can be ran via ```npm run start```.

    Notable libraries used:
    * [NativeWind](https://www.nativewind.dev/) (port of [Tailwind](https://tailwindcss.com/docs/), used for application styling)
    * [React Redux](https://react-redux.js.org/) (state management)

    ## Layout

    * ```src``` - application routes
    * ```components``` - reusable React Native components
    * ```assets``` - static files needed by the application
    * ```constants``` - definitions files such as theme colors







# Database Setup:
Supabase CLI installation instructions can be found in the [Getting Started documentation](https://supabase.com/docs/guides/cli/getting-started).

NOTE: [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) is a prerequisite, please ensure it is installed on your system.

# Basic Usage
* `supabase start`: start the local development environment
* `supabase stop`: stop the local development environment
* `supabase db reset --local`: wipes the local database and freshly seeds it using `seed.sql`

# Additional Information
Please refer to the [Supabase CLI documentation](https://supabase.com/docs/guides/cli) (and Supabase documentation in general) for more advanced CLI commands and their descriptions.






#### Starlight Documentation

Everything you need to know about the project is in the Starlight documentation. 

1. Clone the repository:
    ```bash
    git clone https://github.com/OregonStateUniversity/osu-fsf.git
    ```
2. Navigate to the Starlight directory:
    ```bash
    cd src-docs
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```


## References
- [SvelteKit Documentation](https://kit.svelte.dev/docs/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Tamagui Documentation](https://tamagui.dev/)
- [Redux Documentation](https://redux.js.org/introduction/getting-started)
- [Supabase Documentation](https://supabase.io/docs)
- [Starlight Documentation](https://starlight.astro.build/)
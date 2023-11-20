import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_DEV_SUPABASE_URL, PUBLIC_DEV_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';

// Supabase init function for server
const supabase = async ({ event, resolve }: { event: any, resolve: any }) => {
  event.locals.supabase = createServerClient(
    dev ? PUBLIC_DEV_SUPABASE_URL : PUBLIC_SUPABASE_URL,
    dev ? PUBLIC_DEV_SUPABASE_ANON_KEY : PUBLIC_SUPABASE_ANON_KEY,
    {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options);
      },
      remove: (key, options) => {
        event.cookies.delete(key, options);
      }
    }
  });

  /**
   * A little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name: string) {
      return name === 'content-range';
    }
  });
}

// Auth checker for all pages but root '/'
const authorization = async ({ event, resolve }: { event: any, resolve: any }) => {
  // Protect requests to all routes that aren't '/'
  if (event.url.pathname !== '/') {
    const session = await event.locals.getSession();

    // Is the user not logged in?
    if (!session)
      throw redirect(303, '/');
  }

  // Protect POST requests to all routes that aren't '/'
  if (event.url.pathname !== '/' && event.request.method === 'POST') {
    const session = await event.locals.getSession();
    // Is the user not logged in?
    if (!session)
      throw error(303, '/');
  }

  return resolve(event);
}

export const handle: Handle = sequence(supabase, authorization);
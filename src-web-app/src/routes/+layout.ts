import { dev } from '$app/environment';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_DEV_SUPABASE_ANON_KEY, PUBLIC_DEV_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load: LayoutLoad = async ({ url, fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createBrowserClient(
    dev ? PUBLIC_DEV_SUPABASE_URL : PUBLIC_SUPABASE_URL,
    dev ? PUBLIC_DEV_SUPABASE_ANON_KEY : PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch
      },
      cookies: {
        get(key) {
          if (!isBrowser())
            return JSON.stringify(data.session);

          const cookie = combineChunks(key, (name) => {
            const cookies = parse(document.cookie);
            return cookies[name];
          });

          return cookie;
        }
      }
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  return {
    supabase,
    session,
    pathname: url.pathname
  }
}
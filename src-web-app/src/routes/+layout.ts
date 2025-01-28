import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { LayoutLoad } from './$types';
import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr';

// export const ssr = false; //uncomment to prevent server side rendering

export const load: LayoutLoad = async ({ url, fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createBrowserClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch //supabase defines fetch in the background
      },
      cookies: {
        get(key) { 
          if (!isBrowser())
            return JSON.stringify(data.session);
          
          //if on browser
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
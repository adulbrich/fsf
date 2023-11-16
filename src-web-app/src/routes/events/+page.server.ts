import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();
  if (!session) throw redirect(303, '/');

  return { session };
}) satisfies PageServerLoad;
export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    return { session };
  });
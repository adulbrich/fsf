import { error } from '@sveltejs/kit';

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    return { session };
  });

export const actions = {
  resetPassword: async (event) => {
    const { request, locals } = event;
    const { supabase, getSession} = locals;
    const session = await getSession();

    const data = await request.formData();
    const obj = Object.fromEntries(data);



    const { data: user, error } = await supabase.auth.updateUser({
      password: 
    });

    
  }
}
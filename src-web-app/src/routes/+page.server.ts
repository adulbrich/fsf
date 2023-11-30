import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
  const session = await getSession();

  if (session)
    throw redirect(303, '/events');

  return { session };
}

export const actions: Actions = {
  default: async (event) => {
    const { request, url, locals: { supabase } } = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

    const signInResponse = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInResponse.error) return fail(400, { errorMessage: signInResponse.error.message });

    return {
      success: signInResponse.error === null,
      formData: {
        email: email
      }
    }
  }
}
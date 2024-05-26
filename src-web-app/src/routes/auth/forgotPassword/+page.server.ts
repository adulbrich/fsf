import { z } from 'zod';

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    return { session };
  });

const changeEmailSchema = z.object({
  email: z.string().email(),
});

export const actions = {

  default: async (event) => {
    const { request, locals } = event;
    const { supabase } = locals;

    const formData = await request.formData();
    const obj = Object.fromEntries(formData);

    const { email } = obj;

    try {
      const result = changeEmailSchema.parse(obj);

      const { data: user, error } = await supabase.auth.resetPasswordForEmail(result.email, {
        // will not be localhost in the future
        redirectTo: 'http://localhost:5173/auth/resetPassword'
      });

      if (error) {
        return {
          errors: [
            { field: 'email', message: 'Could not redirect to /auth/resetPassword' }
          ],
          data: obj,
          success: false,
        }
      }
    
      return {
        data: user,
        errors: [],
        success: true,
      };
    } catch (error: any) {

      const { fieldErrors: errors } = error.flatten();

      return {
        errors: errors,
        data: obj,
        success: false,
      }
    }
  }
}
import { error } from '@sveltejs/kit';
import { z } from 'zod';

const changePasswordSchema = z
    .object({
        password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
        confirm_password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
        token: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirm_password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords must match',
                path: ['confirm_password'],
            });
        }
    });


export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    return { session };
  });

export const actions = {
  resetPassword: async (event) => {
    const { request, locals } = event;
    const { supabase, getSession} = locals;
    // const session = await getSession();


    const data = await request.formData();
    const obj = Object.fromEntries(data);

    const result = changePasswordSchema.parse(obj);

    if (result) {
      const { data: user, error } = await supabase.auth.updateUser({
        password: result.password
      });
    }



  }
}
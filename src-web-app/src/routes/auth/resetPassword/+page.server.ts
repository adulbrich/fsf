import { goto } from '$app/navigation';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const changePasswordSchema = z
    .object({
        new_password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
        reconfirm_password: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.new_password !== data.reconfirm_password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords must match!',
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

    try {
      const result = changePasswordSchema.parse(obj);

      if (result) {
        const { data: user, error } = await supabase.auth.updateUser({
          password: result.new_password
        });
        
        if (error) {
          console.log('supa change pw error', error);
          return {
              errors: [
                  { field: 'password', message: "Something went wrong. Please try again" },
              ],
              data: {},
              success: false,
          };
        }

        if (user) {
            return {
                data: user,
                errors: [],
                success: true
            };
        }
        
        if (!error) {
          throw redirect(303, '/events');
        }

      }
    } catch (error: any) {

      try {
        const { fieldErrors: errors } = error.flatten();
        console.log('catch error', errors);

        return {
            errors: errors,
            data: obj,
            success: false,
        };
      } catch (error2) {
        console.log(error)
      }
  }

}}
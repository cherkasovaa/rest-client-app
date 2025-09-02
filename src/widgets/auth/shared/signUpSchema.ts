import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.email({ error: 'Incorrect email address' }),
    password: z
      .string()
      .regex(/\d/, {
        error: 'Password should contain at least 1 number',
      })
      .regex(/[A-ZА-ЯЁ]/, {
        error: 'Password should contain at least 1 uppercase letter',
      })
      .regex(/[a-zа-яё]/, {
        error: 'Password should contain at least 1 lowercase letter',
      })
      .regex(/[!@#$%^&*()_+]/, {
        error:
          'Password should contain at least 1 special character(!@#$%^&*()_+)',
      })
      .min(6),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (!confirmPassword || confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

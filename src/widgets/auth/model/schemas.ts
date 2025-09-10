import { z } from 'zod';

const emailSchema = z.email({ error: 'Incorrect email address' });
const passwordSchema = z
  .string()
  .regex(/\d/, {
    error: 'Password should contain at least 1 number',
  })
  .regex(/[A-Z]/, {
    error: 'Password should contain at least 1 uppercase letter',
  })
  .regex(/[a-z]/, {
    error: 'Password should contain at least 1 lowercase letter',
  })
  .regex(/[!@#$%^&*()_+]/, {
    error: 'Password should contain at least 1 special character(!@#$%^&*()_+)',
  })
  .min(6);

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'The passwords did not match',
    path: ['confirmPassword'],
  });

export type SignInFormModel = z.infer<typeof signInSchema>;
export type SignUpFormModel = z.infer<typeof signUpSchema>;

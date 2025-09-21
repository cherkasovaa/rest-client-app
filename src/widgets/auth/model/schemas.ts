import { z } from 'zod';

const emailSchema = z.email({ error: 'form.incorrectEmailAddress' });
const passwordSchema = z
  .string()
  .regex(/\d/, {
    error: 'form.passwordContainsNumber',
  })
  .regex(/[A-Z]/, {
    error: 'form.passwordContainsUppercaseLetter',
  })
  .regex(/[a-z]/, {
    error: 'form.passwordContainsLowercaseLetter',
  })
  .regex(/[!@#$%^&*()_+]/, {
    error: 'form.passwordContainsSpecial',
  })
  .min(6, {
    error: 'form.passwordMinLength',
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    userName: z.string().regex(/^[A-ZА-ЯЁ]/, {
      error: 'form.nameStartsUppercaseLetter',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'form.passwordNotMatched',
    path: ['confirmPassword'],
  });

export type SignInFormModel = z.infer<typeof signInSchema>;
export type SignUpFormModel = z.infer<typeof signUpSchema>;

import { z } from 'zod';

export const signInSchema = z.object({
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
});

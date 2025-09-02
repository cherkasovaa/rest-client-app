'use client';

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@mui/material';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../../app/firebase/config.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../model/signUpSchema.ts';
import { useToast } from '@/shared/hooks/useToast.tsx';
import { useEffect } from 'react';
import { generateFirebaseAuthErrorMessage } from '@/shared/utils/generateFirebaseAuthErrorMessage.ts';

export type FormModel = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { ToastElement, toastError } = useToast();
  const [
    createUserWithEmailAndPassword,
    _signupData,
    isPendingSignup,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  async function onRegister(data: FormModel) {
    try {
      await createUserWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      toastError('Some error has occured');
    }
  }

  useEffect(() => {
    if (signUpError) {
      toastError(generateFirebaseAuthErrorMessage(signUpError.code));
    }
  }, [signUpError, toastError]);

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <Stack direction={'column'} spacing={2}>
        <FormControl>
          <FormLabel htmlFor={'email'}>Email address</FormLabel>
          <Input
            id={'email'}
            placeholder="example@domain.com"
            {...register('email')}
          />
          <FormHelperText error>{errors.email?.message}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={'password'}>Password</FormLabel>
          <Input
            type={'password'}
            id={'password'}
            placeholder="*****"
            {...register('password')}
          />
          <FormHelperText error>{errors.password?.message}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={'confirmPassword'}>Confirm password</FormLabel>
          <Input
            type={'password'}
            id={'confirmPassword'}
            placeholder="*****"
            {...register('confirmPassword')}
          />
          <FormHelperText error>
            {errors.confirmPassword?.message}
          </FormHelperText>
        </FormControl>
        <Button loading={isPendingSignup} type="submit">
          Register!
        </Button>
      </Stack>
      {ToastElement}
    </form>
  );
}

'use client';

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@mui/material';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../model/signInSchema.ts';
import { z } from 'zod';
import { useEffect } from 'react';
import { generateFirebaseAuthErrorMessage } from '@/shared/utils/generateFirebaseAuthErrorMessage.ts';
import { useToast } from '@/shared/hooks/useToast.tsx';
import { auth } from '../../../../firebase.ts';

type SignUpFormModel = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { ToastElement, toastError } = useToast();
  const [
    signInWithEmailAndPassword,
    _signInData,
    isPendingSignIn,
    signInError,
  ] = useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  async function onRegister(data: SignUpFormModel) {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      console.error(err);
      toastError('Some error has occured');
    }
  }

  useEffect(() => {
    if (signInError) {
      toastError(generateFirebaseAuthErrorMessage(signInError.code));
    }
  }, [signInError, toastError]);

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
        <Button loading={isPendingSignIn} type="submit">
          Sign in!
        </Button>
      </Stack>
      {ToastElement}
    </form>
  );
}

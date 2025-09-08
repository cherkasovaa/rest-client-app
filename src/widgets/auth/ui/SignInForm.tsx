'use client';

import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '@/widgets/auth/model/useSignIn.ts';
import Link from 'next/link';
import { signInSchema } from '@/widgets/auth/model/schemas.ts';
import { useShowRedirectReason } from '@/shared/hooks/useShowRedirectReason.ts';

export function SignInForm() {
  useShowRedirectReason();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const { isPendingSignIn, onSignIn } = useSignIn();

  return (
    <Container maxWidth={'sm'}>
      <form onSubmit={handleSubmit(onSignIn)}>
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
          <p>
            Do not have an account? <Link href="/signup">Sign up!</Link>
          </p>
        </Stack>
      </form>
    </Container>
  );
}

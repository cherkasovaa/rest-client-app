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
import { useSignUp } from '@/widgets/auth/model/useSignUp.ts';
import Link from 'next/link';
import { signUpSchema } from '@/widgets/auth/model/schemas.ts';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const { isPendingSignUp, onSignUp } = useSignUp();

  return (
    <Container maxWidth={'sm'}>
      <form onSubmit={handleSubmit(onSignUp)}>
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
          <Button loading={isPendingSignUp} type="submit">
            Sign up!
          </Button>
          <p>
            Already have an account? <Link href="/signin">Sign in!</Link>
          </p>
        </Stack>
      </form>
    </Container>
  );
}

'use client';

import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@/widgets/auth/model/useSignUp.ts';
import Link from 'next/link';
import { signUpSchema } from '@/widgets/auth/model/schemas.ts';
import { ROUTES } from '@/shared/config/routes.ts';

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
            <FormLabel htmlFor={'userName'}>Name</FormLabel>
            <Input
              id={'userName'}
              placeholder="Name"
              {...register('userName')}
            />
            <FormHelperText error>{errors.userName?.message}</FormHelperText>
          </FormControl>
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
          <Button
            sx={{
              color: 'primary.main',
              backgroundColor: 'secondary.main',

              '&:hover': {
                color: 'secondary.contrastText',
                backgroundColor: 'secondary.main',
              },
            }}
            loading={isPendingSignUp}
            type="submit"
          >
            Sign up!
          </Button>
          <Typography>
            Already have an account?{' '}
            <Typography
              component={Link}
              href={ROUTES.SIGNIN}
              sx={{
                color: 'primary.contrastText',

                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              Sign in!
            </Typography>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
}

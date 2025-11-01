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
import { useSignIn } from '@/widgets/auth/model/useSignIn.ts';
import { Link } from '@/shared/config/i18n/navigation.ts';
import { signInSchema } from '@/widgets/auth/model/schemas.ts';
import { ROUTES } from '@/shared/config/routes.ts';
import { useTranslations } from 'next-intl';

export function SignInForm() {
  const t = useTranslations();
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
            <FormLabel htmlFor={'email'}>{t('form.emailAddress')}</FormLabel>
            <Input
              id={'email'}
              placeholder="example@domain.com"
              {...register('email')}
            />
            <FormHelperText error>
              {errors.email?.message ? t(errors.email?.message) : ''}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor={'password'}>{t('form.password')}</FormLabel>
            <Input
              type={'password'}
              id={'password'}
              placeholder="*****"
              {...register('password')}
            />
            <FormHelperText error>
              {errors.password?.message ? t(errors.password?.message) : ''}
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
            loading={isPendingSignIn}
            type="submit"
          >
            {t('signIn')}!
          </Button>
          <Typography>
            {t('doNotHaveAccount')}?{' '}
            <Typography
              component={Link}
              href={ROUTES.SIGNUP}
              sx={{
                color: 'primary.contrastText',

                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              {t('signUp')}!
            </Typography>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
}

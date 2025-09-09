import { Container, Stack } from '@mui/material';
import Link from 'next/link';
import { SignUpForm } from '@/widgets/auth';

export default function Page() {
  return (
    <Container maxWidth={'sm'}>
      <Stack spacing={3}>
        <SignUpForm />
        <p>
          Already have an account? <Link href="/signin">Sign in!</Link>
        </p>
      </Stack>
    </Container>
  );
}

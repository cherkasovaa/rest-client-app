import { Container, Stack } from '@mui/material';
import Link from 'next/link';
import { SignInForm } from '@/widgets/auth';

export default function Page() {
  return (
    <Container maxWidth={'sm'}>
      <Stack spacing={3}>
        <SignInForm />
        <p>
          Do not have an account? <Link href="/signup">Sign up!</Link>
        </p>
      </Stack>
    </Container>
  );
}

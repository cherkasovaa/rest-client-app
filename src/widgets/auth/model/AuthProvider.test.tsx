import { AuthProvider, useAuth } from '@/widgets/auth';
import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';

const user = {
  providerId: '123',
  displayName: 'user',
  email: 'email',
  photoURL: 'url',
  phoneNumber: '123',
  uid: '123',
};

const TestComponent = () => {
  const { user } = useAuth();
  return JSON.stringify(user);
};

const renderTestComponent = () => {
  render(
    <AuthProvider user={user}>
      <TestComponent />
    </AuthProvider>
  );
};

describe('AuthProvider', () => {
  it('Provides user information', async () => {
    renderTestComponent();
    const userInfo = screen.getByText(JSON.stringify(user));
    expect(userInfo).toBeInTheDocument();
  });
});

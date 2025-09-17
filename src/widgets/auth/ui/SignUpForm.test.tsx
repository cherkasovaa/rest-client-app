import { SignUpForm } from '@/widgets/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, cleanup, render } from '@testing-library/react';

const renderForm = () => {
  render(<SignUpForm />);
};

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    refresh: vi.fn(),
  }),
}));

vi.mock('@/widgets/auth/model/useSignUp', () => ({
  useSignUp: vi.fn().mockReturnValue({
    isPendingSignUp: false,
    onSignUp: vi.fn(),
  }),
}));

describe('Sign up fields validation', () => {
  beforeEach(cleanup);

  it('Show username validation errors', async () => {
    const errorText = 'Name must start with uppercase letter';
    renderForm();
    const input = screen.getByLabelText('Name') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'user' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorText);
      expect(error).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: 'User' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorText);
      expect(error).not.toBeInTheDocument();
    });
  });

  it('When email address is invalid show an error', async () => {
    const errorText = 'Incorrect email address';
    renderForm();
    const input = screen.getByLabelText('Email address') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'invalidemail' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorText);
      expect(error).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: 'valid@email.com' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorText);
      expect(error).not.toBeInTheDocument();
    });
  });

  it('Show password validation errors', async () => {
    const errorTextLength = 'Too small: expected string to have >=6 characters';
    const errorTextNumber = 'Password should contain at least 1 number';
    const errorTextUppercase =
      'Password should contain at least 1 uppercase letter';
    const errorTextSpecialSymbols =
      'Password should contain at least 1 special character(!@#$%^&*()_+)';

    renderForm();
    const input = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'd' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorTextNumber);
      expect(error).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: 'd1' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorTextUppercase);
      expect(error).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: 'd1D' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorTextSpecialSymbols);
      expect(error).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: 'd1D@' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorTextLength);
      expect(error).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: 'd1D@55555' },
    });

    await vi.waitFor(() => {
      const errorLength = screen.queryByText(errorTextLength);
      const errorNumber = screen.queryByText(errorTextNumber);
      const errorUppercase = screen.queryByText(errorTextUppercase);
      const errorSpecialSymbols = screen.queryByText(errorTextSpecialSymbols);

      expect(errorLength).not.toBeInTheDocument();
      expect(errorNumber).not.toBeInTheDocument();
      expect(errorUppercase).not.toBeInTheDocument();
      expect(errorSpecialSymbols).not.toBeInTheDocument();
    });
  });

  it('Show error when passwords are not the same', async () => {
    const errorText = 'The passwords did not match';
    renderForm();
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      'Confirm password'
    ) as HTMLInputElement;

    fireEvent.change(passwordInput, {
      target: { value: 'd1D@55555' },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: '12' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorText);
      expect(error).toBeInTheDocument();
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'd1D@55555' },
    });

    await vi.waitFor(() => {
      const error = screen.queryByText(errorText);
      expect(error).not.toBeInTheDocument();
    });
  });
});

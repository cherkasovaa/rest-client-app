import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import * as pathMethods from '@/shared/libs/utils/pathMethods';
import { ClientFormControl } from './ClientFormControl';

vi.mock('@/shared/libs/utils/pathMethods');

describe('ClientFormComponent', () => {
  const mockParsePathParams = vi.spyOn(pathMethods, 'parsePathParams');
  const mockUpdatePathParams = vi.spyOn(pathMethods, 'updatePathParams');

  beforeEach(() => {
    vi.clearAllMocks();
    mockParsePathParams.mockReturnValue({
      method: 'GET',
      endpoint: '/testing',
      body: '',
    });
  });

  const user = userEvent.setup();

  test('should render correctly with initial values', () => {
    render(<ClientFormControl handleRequest={vi.fn()} isLoading={false} />);

    const methodSelect = screen.getByRole('combobox');
    expect(methodSelect).toHaveTextContent('GET');

    const endpointInput = screen.getByLabelText(/request url/i);
    expect(endpointInput).toHaveValue('/testing');

    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeEnabled();
  });

  test('should update updatePathParams on endpoint change', async () => {
    render(<ClientFormControl handleRequest={vi.fn()} isLoading={false} />);

    const endpointInput = screen.getByLabelText(/request url/i);

    await user.clear(endpointInput);
    expect(endpointInput).toHaveValue('');

    await user.type(endpointInput, 'new-testing');
    expect(mockUpdatePathParams).toHaveBeenCalled();
  });

  test('should update updatePathParams on method change', async () => {
    render(<ClientFormControl handleRequest={vi.fn()} isLoading={false} />);

    const methodSelect = screen.getByRole('combobox');
    expect(methodSelect).toHaveTextContent('GET');

    await user.click(methodSelect);
    const option = await screen.findByRole('option', { name: 'POST' });

    await user.click(option);
    expect(mockUpdatePathParams).toHaveBeenCalled();
    expect(methodSelect).toHaveTextContent('POST');
  });

  test('should disable button if endpoint is empty and call sendRequest on button clicked', async () => {
    const handleRequest = vi.fn().mockResolvedValue(undefined);

    render(
      <ClientFormControl handleRequest={handleRequest} isLoading={false} />
    );

    const endpointInput = screen.getByLabelText(/request url/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.clear(endpointInput);
    expect(endpointInput).toHaveValue('');
    expect(sendButton).toBeDisabled();

    await user.type(endpointInput, '/test');
    expect(sendButton).toBeEnabled();

    await user.click(sendButton);
    expect(handleRequest).toHaveBeenCalled();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect, test } from 'vitest';
import { ClientTabs } from './ClientTabs';
import userEvent from '@testing-library/user-event';

describe('ClientTabs', () => {
  test('shoudl render all tabs and switch correctly', async () => {
    const body = <div data-testid="body">Body Content</div>;
    const headers = <div data-testid="headers">Headers Content</div>;
    const code = <div data-testid="code">Code Content</div>;

    render(<ClientTabs body={body} headers={headers} code={code} />);

    expect(screen.getByRole('tab', { name: 'BODY' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'HEADERS' })).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: 'GENERATE CODE' })
    ).toBeInTheDocument();

    expect(screen.getByTestId('body')).toBeVisible();
    expect(screen.queryByTestId('headers')).not.toBeInTheDocument();
    expect(screen.queryByTestId('code')).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole('tab', { name: 'HEADERS' }));

    expect(screen.queryByTestId('body')).not.toBeInTheDocument();
    expect(screen.getByTestId('headers')).toBeVisible();
    expect(screen.queryByTestId('code')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'GENERATE CODE' }));

    expect(screen.queryByTestId('body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('headers')).not.toBeInTheDocument();
    expect(screen.getByTestId('code')).toBeVisible();
  });
});

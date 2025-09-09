import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { CODE_LANGUAGES } from '@/shared/types/code-languages';
import { CodeLanguageSelector } from './CodeLanguageSelector';
import { render, screen } from '@testing-library/react';

describe('CodeLanguageSelector', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  test('should render current language', () => {
    render(
      <CodeLanguageSelector value={CODE_LANGUAGES[0]} onChange={onChange} />
    );

    expect(
      screen.getByText(`${CODE_LANGUAGES[0].language}`)
    ).toBeInTheDocument();
  });

  test('should open select list and call onChange on select', async () => {
    render(
      <CodeLanguageSelector value={CODE_LANGUAGES[0]} onChange={onChange} />
    );
    const button = screen.getByRole('combobox');
    const user = userEvent.setup();

    await user.click(button);

    const option = await screen.findByText(/Python/i);
    expect(option).toBeInTheDocument();

    await user.click(option);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(CODE_LANGUAGES[5]);
  });
});

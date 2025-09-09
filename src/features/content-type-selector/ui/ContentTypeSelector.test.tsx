import { ContentTypeSelector } from '@/features/content-type-selector';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CONTENT_TYPES } from '@/shared/types/content-types';

import { render, screen } from '@testing-library/react';

describe('ContentTypeSelector', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  test('should render current type', () => {
    render(<ContentTypeSelector onChange={onChange} />);

    const DEFAULT_VALUE = CONTENT_TYPES[0].value;

    expect(screen.getByText(DEFAULT_VALUE)).toBeInTheDocument();
  });

  test('should open select list and call onChange on select', async () => {
    render(<ContentTypeSelector onChange={onChange} />);

    const combobox = screen.getByRole('combobox');
    const user = userEvent.setup();

    await user.click(combobox);

    const TEST_VALUE = CONTENT_TYPES[1].value;
    const option = await screen.findByText(TEST_VALUE);
    expect(option).toBeInTheDocument();

    await user.click(option);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(CONTENT_TYPES[1].language);
  });
});

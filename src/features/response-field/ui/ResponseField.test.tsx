import type { ApiResponse } from '@/shared/model/types/api';
import { screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { ResponseField } from './ResponseField';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

vi.mock('@monaco-editor/react', () => {
  const EditorMock = (props: { value?: string }) => {
    return <pre data-testid="editor">{props.value ?? ''}</pre>;
  };

  return {
    __esModule: true,
    default: EditorMock,
    Editor: EditorMock,
  };
});

describe('ResponseField', () => {
  test('should show response status', () => {
    const mockResponse: ApiResponse = {
      status: 200,
      body: '{"message":"ok"}',
      statusText: 'Success',
      ok: true,
    };

    renderWithIntlProvider(
      <ResponseField response={mockResponse} loading={false} />
    );

    expect(screen.getByText('Status response: 200')).toBeInTheDocument();
    expect(screen.getByText('{"message":"ok"}')).toBeInTheDocument();
  });
});

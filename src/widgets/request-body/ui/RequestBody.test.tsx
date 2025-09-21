import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/shared/lib/utils/pathMethods', () => ({
  parsePathParams: vi.fn(),
  updatePathParams: vi.fn(),
}));

import {
  parsePathParams,
  updatePathParams,
} from '@/shared/lib/utils/pathMethods';

vi.mock('@/features/content-type-selector', () => ({
  ContentTypeSelector: (props: { onChange: (lang: string) => void }) => {
    return (
      <div data-testid="content-type-selector">
        <button
          data-testid="ctype-json"
          onClick={() => {
            props.onChange('json');
          }}
        >
          json
        </button>
      </div>
    );
  },
}));

interface MockEditor {
  getValue(): string;
  setValue(value: string): void;
  onDidBlurEditorText(cb: () => void): { dispose(): void };
  triggerBlur(): void;
}

declare global {
  interface Window {
    __mockEditor?: MockEditor | undefined;
  }
}

vi.mock('@monaco-editor/react', () => {
  type EditorProps = {
    onMount?: (editor: MockEditor) => void;
    value?: string;
    language?: string;
  };

  const EditorMock = (props: EditorProps) => {
    let _value = props.value ?? '';

    let blurCb: (() => void) | null = null;

    const editor: MockEditor = {
      getValue: () => _value,
      setValue: (val: string) => {
        _value = val;
      },
      onDidBlurEditorText: (cb: () => void) => {
        blurCb = cb;
        return {
          dispose() {
            blurCb = null;
          },
        };
      },
      triggerBlur: () => {
        if (blurCb) blurCb();
      },
    };

    window.__mockEditor = editor;

    if (props.onMount) {
      props.onMount(editor);
    }

    return (
      <pre data-testid="editor-mock" data-lang={props.language ?? 'unknown'}>
        {_value}
      </pre>
    );
  };

  return {
    __esModule: true,
    default: EditorMock,
    Editor: EditorMock,
  };
});

import { prettify } from '@/shared/lib/utils/prettify';
import { RequestBody } from './RequestBody';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

describe('RequestBody', () => {
  const mockedParse = vi.mocked(parsePathParams);
  const mockedUpdate = vi.mocked(updatePathParams);
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    window.__mockEditor = undefined;
  });

  afterEach(() => {
    window.__mockEditor = undefined;
  });

  test('should set editor value from parsePathParams body onMount', () => {
    mockedParse.mockReturnValue({
      method: 'POST',
      endpoint: 'test',
      body: '{"x":1}',
    });

    renderWithIntlProvider(<RequestBody />);

    const editor = window.__mockEditor;
    expect(editor).toBeDefined();
    expect(editor!.getValue()).toBe('{"x":1}');
  });

  test('should format value with prettify and call updatePathParams', async () => {
    mockedParse.mockReturnValue({
      method: 'POST',
      endpoint: 'test',
      body: '{"a":1,"b":2}',
    });

    renderWithIntlProvider(<RequestBody />);

    const editor = window.__mockEditor;
    expect(editor).toBeDefined();
    expect(editor!.getValue()).toBe('{"a":1,"b":2}');

    const prettifyBtn = screen.getByRole('button', { name: /prettify/i });
    await user.click(prettifyBtn);

    const expected = prettify('{"a":1,"b":2}', 'json');
    expect(editor!.getValue()).toBe(expected);

    expect(mockedUpdate).toHaveBeenCalled();
    const lastArg = mockedUpdate.mock.calls.at(-1)?.[0];
    expect(lastArg).toMatchObject({
      method: 'POST',
      endpoint: 'test',
      body: expected,
    });
  });

  test('should triggers updatePathParams with current editor value on blur', async () => {
    mockedParse.mockReturnValue({
      method: 'POST',
      endpoint: 'test',
      body: 'init',
    });

    renderWithIntlProvider(<RequestBody />);

    const editor = window.__mockEditor!;
    expect(editor).toBeDefined();

    editor.setValue('user-changed');
    editor.triggerBlur();

    expect(mockedUpdate).toHaveBeenCalled();
    const lastArg = mockedUpdate.mock.calls.at(-1)?.[0];
    expect(lastArg).toMatchObject({
      method: 'POST',
      endpoint: 'test',
      body: 'user-changed',
    });
  });
});

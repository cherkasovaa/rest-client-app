import type { CodeLanguage } from '@/shared/model/types/code-languages';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('../model/generateCode', () => {
  return {
    generateCode: vi.fn(),
  };
});

vi.mock('@/features/code-language-selector', () => {
  return {
    CodeLanguageSelector: (props: {
      value: CodeLanguage;
      onChange: (language: CodeLanguage) => void;
    }) => {
      const { value, onChange } = props;
      return (
        <div data-testid="mock-language-selector">
          <span data-testid="current-lang">{value.language}</span>
          <button
            type="button"
            data-testid="change-to-Go"
            onClick={() => {
              onChange({
                language: 'Go',
                variant: 'Native',
                target: 'go',
                editorLanguage: 'go',
              });
            }}
          >
            change
          </button>
        </div>
      );
    },
  };
});

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

import { CODE_LANGUAGES } from '@/shared/model/types/code-languages';
import { generateCode } from '@/widgets/request-code/model/generateCode';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RequestCode } from './RequestCode';

describe('RequestCode component', () => {
  const mockedGenerateCode = vi.mocked(generateCode);
  const originalLocation = window.location;

  beforeEach(() => {
    const mockLocation: Partial<Location> = {
      pathname: '/rest-client/GET/aHR0cHM6Ly90ZXN0aW5n',
      search: 'test=testing',
    };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    mockedGenerateCode.mockReset();
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
    vi.clearAllMocks();
  });

  test('should render initial editor content and generate button', () => {
    render(<RequestCode />);

    expect(screen.getByTestId('editor')).toHaveTextContent(
      '// Select a way to generate code and click the button'
    );
    expect(
      screen.getByRole('button', { name: /Generate Code/i })
    ).toBeInTheDocument();
  });

  test('should generateCode and update editor when selection Go and clicking the button', async () => {
    mockedGenerateCode.mockReturnValue('test passed');
    render(<RequestCode />);

    const user = userEvent.setup();

    const selectGo = screen.getByTestId('change-to-Go');
    await user.click(selectGo);

    const buttonGenerateCode = screen.getByRole('button', {
      name: /Generate Code/i,
    });
    await user.click(buttonGenerateCode);

    const goLang = CODE_LANGUAGES.find((language) => language.target === 'go');
    expect(goLang).toBeDefined();
    expect(mockedGenerateCode).toHaveBeenCalledWith(goLang);
    expect(screen.getByTestId('editor')).toHaveTextContent('test passed');
  });
});

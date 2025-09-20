import { WORKSPACE_LINKS } from '@/widgets/workspace-navigator/config/workspace-links';
import { WorkspaceNavigator } from '@/widgets/workspace-navigator/ui/WorkspaceNavigator';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

const expectedText = {
  restClient: 'REST Client',
  history: 'History',
  variables: 'Variables',
};

describe('WorkspaceNavigator', () => {
  test.each(WORKSPACE_LINKS)(
    'renders workspace link $name with path $path',
    ({ name, path }) => {
      renderWithIntlProvider(<WorkspaceNavigator />);

      const btn = screen.getByRole('link', {
        name: expectedText[name as never] || '',
      });

      expect(btn).toHaveAttribute('href', path);
    }
  );
});

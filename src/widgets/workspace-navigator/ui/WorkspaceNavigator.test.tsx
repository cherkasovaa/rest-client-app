import { WORKSPACE_LINKS } from '@/widgets/workspace-navigator/config/workspace-links';
import { WorkspaceNavigator } from '@/widgets/workspace-navigator/ui/WorkspaceNavigator';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('WorkspaceNavigator', () => {
  test.each(WORKSPACE_LINKS)(
    'renders workspace link $name with path $path',
    ({ name, path }) => {
      render(<WorkspaceNavigator />);

      const btn = screen.getByRole('link', { name: name });

      expect(btn).toHaveAttribute('href', path);
    }
  );
});

import { wrapperStyles } from '@/widgets/workspace-navigator/config/styles';
import { WORKSPACE_LINKS } from '@/widgets/workspace-navigator/config/workspace-links';
import type { WidgetVariant } from '@/widgets/workspace-navigator/model/types';
import { Button, Paper } from '@mui/material';
import Link from 'next/link';

export const WorkspaceNavigator = ({
  variant = 'home',
}: {
  variant?: WidgetVariant;
}) => {
  const padding = wrapperStyles[variant];

  return (
    <Paper
      elevation={12}
      sx={{
        p: { padding },
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        backgroundColor: 'primary.main',
        width: '100%',
      }}
    >
      {WORKSPACE_LINKS.map(({ name, path }) => (
        <Button
          key={name}
          component={Link}
          href={path}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: 'secondary.main',
          }}
        >
          {name}
        </Button>
      ))}
    </Paper>
  );
};

import { methodColors } from '@/features/request-list/model/methodColors';
import { ROUTES } from '@/shared/config/routes';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { Box, ListItem, Paper, Typography } from '@mui/material';
import Link from 'next/link';

export const RequestItem = ({ request }: { request: RequestData }) => {
  const d = new Date(request.requestTimestamp);

  const time = d.toLocaleTimeString();
  const date = d.toLocaleDateString();

  return (
    <ListItem
      sx={{
        marginBottom: '0.5rem',
      }}
    >
      <Paper
        component={Link}
        href={ROUTES.REST_CLIENT}
        elevation={3}
        sx={{
          padding: { xs: '1rem 1.5rem', md: '1rem 3rem' },
          margin: '0 auto',
          textDecoration: 'none',
          overflowX: 'auto',
          width: '100%',
        }}
      >
        <Box mb={1}>
          <Typography
            component="span"
            fontWeight="bold"
            mr={1}
            color={methodColors[request.requestMethod] || 'secondary.main'}
          >
            {request.requestMethod}:
          </Typography>
          <Typography
            component="span"
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            {request.endpoint}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {date} | {time}
        </Typography>
      </Paper>
    </ListItem>
  );
};

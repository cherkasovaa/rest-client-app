import { formatBytes } from '@/features/request-list/lib/formatBytes';
import { formatDuration } from '@/features/request-list/lib/formatDuration';
import { methodColors } from '@/features/request-list/model/methodColors';
import { statusColors } from '@/features/request-list/model/statusColors';
import { REQUEST_ID_QUERY_KEY } from '@/shared/config/queryParam';
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
        href={`${ROUTES.REST_CLIENT}/?${REQUEST_ID_QUERY_KEY}=${request.id}`}
        elevation={3}
        sx={{
          padding: { xs: '1rem 1.5rem', md: '1rem 3rem' },
          margin: '0 auto',
          textDecoration: 'none',
          overflowX: 'auto',
          width: '100%',
        }}
      >
        <Box mb={0.25}>
          <Typography
            component="span"
            fontWeight="bold"
            mr={1}
            color={methodColors[request.requestMethod]}
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
        <Box mb={1}>
          {request.statusCode > 0 && (
            <Typography
              component="span"
              variant="body2"
              color={statusColors[Math.floor(request.statusCode / 100)]}
              mr={1}
              fontWeight="bold"
            >
              {request.statusCode}
            </Typography>
          )}
          {request.errorDetails && (
            <Typography
              component="span"
              variant="body2"
              color={statusColors[Math.floor(request.statusCode / 100)]}
            >
              Error: {request.errorDetails}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 2 } }}>
          <Typography variant="body2" color="text.secondary">
            {date} | {time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {formatDuration(request.duration)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Request size: {formatBytes(request.requestSize)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Response size: {formatBytes(request.responseSize)}
          </Typography>
        </Box>
      </Paper>
    </ListItem>
  );
};

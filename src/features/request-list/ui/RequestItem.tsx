'use client';

import { formatBytes } from '@/features/request-list/lib/formatBytes';
import { formatDuration } from '@/features/request-list/lib/formatDuration';
import { methodColors } from '@/features/request-list/model/methodColors';
import { statusColors } from '@/features/request-list/model/statusColors';
import { REQUEST_ID_QUERY_KEY } from '@/shared/config/queryParam';
import { ROUTES } from '@/shared/config/routes';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { Box, Paper, Typography } from '@mui/material';
import { Link } from '@/shared/config/i18n/navigation.ts';
import { useTranslations } from 'next-intl';

export const RequestItem = (
  props: Omit<RequestData, 'requestTimestamp'> & { time: string; date: string }
) => {
  const t = useTranslations();

  return (
    <Paper
      component={Link}
      href={`${ROUTES.REST_CLIENT}/?${REQUEST_ID_QUERY_KEY}=${props.id}`}
      elevation={3}
      sx={{
        padding: { xs: '1rem 1.5rem', md: '1rem 3rem' },
        margin: '0 auto',
        textDecoration: 'none',
        overflowX: 'auto',
        width: '100%',
        transition: '0.3s',

        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box mb={0.25}>
        <Typography
          component="span"
          fontWeight="bold"
          mr={1}
          color={methodColors[props.requestMethod]}
        >
          {props.requestMethod}:
        </Typography>
        <Typography
          component="span"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          {props.endpoint}
        </Typography>
      </Box>
      <Box mb={1}>
        {props.statusCode > 0 && (
          <Typography
            component="span"
            variant="body2"
            color={statusColors[Math.floor(props.statusCode / 100)]}
            mr={1}
            fontWeight="bold"
          >
            {props.statusCode}
          </Typography>
        )}
        {props.errorDetails && (
          <Typography
            component="span"
            variant="body2"
            color={statusColors[Math.floor(props.statusCode / 100)]}
          >
            {t('error')}: {props.errorDetails}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 2 } }}>
        <Typography variant="body2" color="text.secondary">
          {props.date} | {props.time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('duration')}: {formatDuration(props.duration)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('requestSize')}: {formatBytes(props.requestSize)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('responseSize')}: {formatBytes(props.responseSize)}
        </Typography>
      </Box>
    </Paper>
  );
};

import { RequestList } from '@/features/request-list';
import type { RequestData } from '@/shared/types/request-data-firebase';
import { HistoryEmptyState } from '@/widgets/history-widget/';
import { Typography } from '@mui/material';

export const HistoryWidget = ({ requests }: { requests: RequestData[] }) => {
  return requests.length > 0 ? (
    <>
      <Typography component="h1" variant="h4" textAlign="center" mb={4}>
        History Requests
      </Typography>
      <RequestList requests={requests} />
    </>
  ) : (
    <HistoryEmptyState />
  );
};

import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { HistoryWidget } from '@/widgets/history-widget';
import { Box } from '@mui/material';

export const HistoryPage = ({ requests }: { requests: RequestData[] }) => {
  return (
    <Box sx={{ height: '100%', padding: '2rem 0' }}>
      <HistoryWidget requests={requests} />
    </Box>
  );
};

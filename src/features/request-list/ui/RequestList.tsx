import { RequestItem } from '@/features/request-list';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { List } from '@mui/material';

export const RequestList = ({ requests }: { requests: RequestData[] }) => {
  return (
    <List>
      {requests.map((request) => (
        <RequestItem key={request.id} request={request} />
      ))}
    </List>
  );
};

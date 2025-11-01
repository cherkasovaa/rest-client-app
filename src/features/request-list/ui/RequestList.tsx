import { RequestItem } from '@/features/request-list';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { List, ListItem } from '@mui/material';

export const RequestList = ({ requests }: { requests: RequestData[] }) => {
  const getTime = (requestTimestamp: string) => {
    const requestDate = new Date(requestTimestamp);

    return requestDate.toLocaleTimeString();
  };

  const getDate = (requestTimestamp: string) => {
    const requestDate = new Date(requestTimestamp);

    return requestDate.toLocaleDateString();
  };

  const renderRequestItem = (request: RequestData) => (
    <ListItem
      key={request.id}
      sx={{
        marginBottom: '0.5rem',
      }}
    >
      <RequestItem
        id={request.id}
        duration={request.duration}
        statusCode={request.statusCode}
        time={getTime(request.requestTimestamp)}
        date={getDate(request.requestTimestamp)}
        requestMethod={request.requestMethod}
        requestSize={request.requestSize}
        responseSize={request.responseSize}
        errorDetails={request.errorDetails}
        endpoint={request.endpoint}
        requestBody={request.requestBody}
        requestHeaders={request.requestHeaders}
      />
    </ListItem>
  );

  return <List>{requests.map(renderRequestItem)}</List>;
};

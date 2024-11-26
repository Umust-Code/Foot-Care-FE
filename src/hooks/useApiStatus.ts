import { useState } from 'react';
import { StatusType } from 'types/apiStatusTypes';

function useApiStatus() {
  const [status, setStatus] = useState<StatusType>('idle');

  const handleStatusChange = (newStatus: StatusType) => {
    setStatus(newStatus);
  };

  return [status, handleStatusChange] as const;
}

export { useApiStatus };

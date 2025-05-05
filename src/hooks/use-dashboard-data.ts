import { useQuery } from '@tanstack/react-query';

import { getData } from 'src/services/getService';

export function useDashboardData(endpoint: string) {
  const { data } = useQuery({
    queryKey: [`${endpoint}`],
    queryFn: () => getData(`/${endpoint}`),
  });
  return {data};
}

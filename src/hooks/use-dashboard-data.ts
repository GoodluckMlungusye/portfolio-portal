import { useQuery } from '@tanstack/react-query';

import { api } from 'src/utils/api';

import { getData } from 'src/services/getService';

export function useDashboardData(endpoint: string) {
  const { data } = useQuery({
    queryKey: [`${endpoint}`],
    queryFn: () => getData(`${api.get}/${endpoint}`),
  });
  return {data};
}

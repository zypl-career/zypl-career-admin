import { apiService } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { TUserStatistic } from './types';

export const useExportReportData = () => {
  return useQuery<TUserStatistic>({
    queryKey: ['exportReportData'],
    queryFn: () =>
      apiService
        .get('/statistics/users', {
          params: {
            ageRanges: '[[0,11], [12,13], [14,15], [16,17], [18,24], [25,40]]',
          },
        })
        .then(({ data }) => data),
  });
};

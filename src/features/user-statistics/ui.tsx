import { UserStatistics } from '@entities';
import { Spinner } from '@ui';
import { useGetUserStatistics } from './services';

export const Statistics = () => {
  const { data, isLoading } = useGetUserStatistics();

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>Не удалось загрузить данные статистики.</p>;
  }

  return <UserStatistics data={data.data} />;
};

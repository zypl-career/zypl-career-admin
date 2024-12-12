import { UserFastTable } from '@entities';
import { Spinner } from '@ui';
import { useUserFast } from './services';

export const UserFast = () => {
  const { data: users, isLoading } = useUserFast();

  return (
    <section>
      {isLoading ? <Spinner /> : <UserFastTable data={users?.data || []} onDelete={() => {}} onEdit={() => {}} />}
    </section>
  );
};

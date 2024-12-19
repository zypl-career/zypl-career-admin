import { useExport } from '@/shared/hooks';
import { UserFastTable } from '@entities';
import { Button, Spinner } from '@ui';
import { useUserFast } from './services';

export const UserFast = () => {
  const { data: users, isLoading } = useUserFast();
  const { isExportLoading, downloadHandler } = useExport('/user/export');

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Не зарегистрированные пользователи ({users?.data.length})</h1>
        <Button variant="outline" disabled={isExportLoading} onClick={downloadHandler}>
          Экспортировать
        </Button>
      </header>
      {isLoading ? <Spinner /> : <UserFastTable data={users?.data || []} onDelete={() => {}} onEdit={() => {}} />}
    </section>
  );
};

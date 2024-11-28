import { TUniversity, UniversityList } from '@entities';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, Spinner } from '@ui';
import { useGetUniversities } from './services';

export const Universities = () => {
  const { data, isLoading } = useGetUniversities();
  const [editUniversity, setEditUniversity] = useState<Partial<TUniversity>>(
    {},
  );
  const [deleteUniversity, setDeleteUniversity] = useState<
    Partial<TUniversity>
  >({});
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const handleToggleModals = (value: keyof typeof modals) => {
    setModals((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const handleDelete = (value: Partial<TUniversity>) => {
    handleToggleModals('delete');
    setDeleteUniversity(value);
  };

  const handleEdit = (value: Partial<TUniversity>) => {
    handleToggleModals('edit');
    setEditUniversity(value);
  };

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Университеты</h1>
        <Button onClick={() => handleToggleModals('create')}>
          <PlusIcon />
          Добавить университет
        </Button>
      </header>
      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (
        <p>Нет университетов для отображения</p>
      ) : (
        <UniversityList
          data={data?.data ?? []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </section>
  );
};

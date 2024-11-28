import { EducationCenterList, TEducationCenter } from '@entities';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, Spinner } from '@ui';
import { CreateEducationCenter, DeleteEducationCenter } from './components';
import { UpdateEducationCenter } from './components/update';
import { useGetEducationCenters } from './services';

export const EducationCenters = () => {
  const [filters] = useState({
    city: '',
    title: '',
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetEducationCenters(filters);

  const [editEducationCenter, setEditEducationCenter] = useState<
    Partial<TEducationCenter>
  >({});
  const [deleteEducationCenter, setDeleteEducationCenter] = useState<
    Partial<TEducationCenter>
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

  const handleEdit = (value: Partial<TEducationCenter>) => {
    handleToggleModals('edit');
    setEditEducationCenter(value);
  };

  const handleDelete = (value: Partial<TEducationCenter>) => {
    handleToggleModals('delete');
    setDeleteEducationCenter(value);
  };

  return (
    <section>
      <header className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Образовательные центры</h1>
        <Button onClick={() => handleToggleModals('create')}>
          <PlusIcon />
          Добавить образовательный центр
        </Button>
      </header>
      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (
        <p>Нет образовательных центров для отображения</p>
      ) : (
        <EducationCenterList
          data={data?.data ?? []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      <CreateEducationCenter
        open={modals.create}
        toggle={() => handleToggleModals('create')}
      />
      <DeleteEducationCenter
        id={deleteEducationCenter.id}
        open={modals.delete}
        setOpen={() => handleToggleModals('delete')}
      />
      <UpdateEducationCenter
        data={editEducationCenter}
        open={modals.edit}
        toggle={() => handleToggleModals('edit')}
      />
    </section>
  );
};

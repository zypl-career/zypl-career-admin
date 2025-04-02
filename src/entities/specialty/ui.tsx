import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, Spinner } from '@ui';
import { useToggleModals } from '@hooks';
import { CreateSpecialty, DeleteSpecialty, SpecialtyCardList, UpdateSpecialty } from './components';
import { useGetSpecialty } from './services';
import { TSpecialty } from './types';

export const SpecialtyUI = () => {
  const { toggleModals, setToggleModals, handleToggleModals } = useToggleModals();
  const specialtiesApi = useGetSpecialty();
  const [specialtyToDelete, setSpecialtyToDelete] = useState<Partial<TSpecialty>>({});
  const [specialtyToEdit, setSpecialtyToEdit] = useState<Partial<TSpecialty>>({});

  const handleToggleCreateModal = () => {
    handleToggleModals('create');
  };

  const handleDelete = (specialty: TSpecialty) => {
    handleToggleModals('delete');
    setSpecialtyToDelete(specialty);
  };

  const handleEdit = (specialty: TSpecialty) => {
    handleToggleModals('edit');
    setSpecialtyToEdit(specialty);
  };

  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Специальности</h1>
        <Button onClick={handleToggleCreateModal}>
          <PlusIcon />
          Добавить специальность
        </Button>
      </header>
      {specialtiesApi.isLoading ? (
        <Spinner />
      ) : (
        <section className="grid gap-5 md:grid-cols-3">
          <SpecialtyCardList
            data={specialtiesApi?.data || []}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>
      )}
      <CreateSpecialty open={toggleModals.create} toggle={handleToggleCreateModal} />
      <UpdateSpecialty
        data={specialtyToEdit}
        open={toggleModals.edit}
        toggle={(value) => setToggleModals((prev) => ({ ...prev, edit: value }))}
      />
      <DeleteSpecialty
        open={toggleModals.delete}
        setOpen={(value) => setToggleModals((prev) => ({ ...prev, delete: value }))}
        id={specialtyToDelete?.id?.toString()}
      />
    </>
  );
};

import { CreateSpecialty, SpecialtyTableUI, useGetSpecialty } from '@entities';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, Spinner } from '@ui';

export const SpecialtyUI = () => {
  const { data: specialties, isLoading } = useGetSpecialty();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleToggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Специальности</h1>
        <Button onClick={handleToggleCreateModal}>
          <PlusIcon />
          Добавить специальность
        </Button>
      </header>
      {isLoading ? (
        <Spinner />
      ) : (
        <SpecialtyTableUI data={specialties?.data || []} onDelete={() => {}} onEdit={() => {}} />
      )}
      <CreateSpecialty open={isCreateModalOpen} toggle={handleToggleCreateModal} />
    </section>
  );
};

import { PartnersList, TPartners } from '@entities';
import { Button, Spinner } from '@ui';
import { useGetPartners } from './services';
import { useState } from 'react';
import { CreatePartner } from './components';
import { UpdatePartner } from './components/update-partner';

export const Partners = () => {
  const { data, isLoading } = useGetPartners();
  const [editPartner, setEditPartner] = useState<Partial<TPartners>>({});
  const [deletePartner, setDeletePartner] = useState<Partial<TPartners>>({});
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false,
  })

  const handleToggleModals = (value: keyof typeof modals) => {
    setModals(prev => ({
      ...prev,
      [value]: !prev[value],
    }))
  };

  const handleDelete = (value: Partial<TPartners>) => {
    handleToggleModals('delete')
    setDeletePartner(value)
  };
  
  const handleEdit = (value: Partial<TPartners>) => {
    handleToggleModals('edit')
    setEditPartner(value)
  };
  
  return (
    <section>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Партнеры</h1>
        <Button onClick={() => handleToggleModals('create')}>
          Добавить партнера
        </Button>
      </header>
      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (  
        <p>Нет партнеров для отображения</p>
      ) : (
        <PartnersList
          data={data?.data ?? []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      <CreatePartner
        open={modals.create}
        toggle={() => handleToggleModals('create')}
      />
      <UpdatePartner
        data={editPartner}
        open={modals.edit}
        toggle={() => handleToggleModals('edit')}
      />
    </section>
  );
};

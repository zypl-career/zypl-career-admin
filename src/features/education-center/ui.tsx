/* eslint-disable @typescript-eslint/no-unused-vars */
import { EducationCenterList, TEducationCenter } from '@entities';
import { useState } from 'react';
import { Spinner } from '@ui';
import { useGetEducationCenters } from './services';

export const EducationCenters = () => {
  const [filters] = useState({
    city: '',
    title: '',
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetEducationCenters(filters);

  const [, setEditCenter] = useState<Partial<TEducationCenter>>();
  const [, setModals] = useState({
    edit: false,
    delete: false,
  });

  const handleEdit = (value: Partial<TEducationCenter>) => {
    setModals((prev) => ({ ...prev, edit: true }));
    setEditCenter(value);
  };

  const handleDelete = (value: Partial<TEducationCenter>) => {
    setModals((prev) => ({ ...prev, delete: true }));
    setEditCenter(value);
  };

  return (
    <section>
      <header>
        <h2>Образовательные центры</h2>
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
    </section>
  );
};

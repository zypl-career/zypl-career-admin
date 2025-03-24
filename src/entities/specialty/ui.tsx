import { SpecialtyTableUI, useGetSpecialty } from '@entities';
import { Spinner } from '@ui';

export const SpecialtyUI = () => {
  const { data: specialties, isLoading } = useGetSpecialty();

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <SpecialtyTableUI data={specialties?.data || []} onDelete={() => {}} onEdit={() => {}} />
      )}
    </section>
  );
};

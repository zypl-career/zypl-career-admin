import { PartnersList } from '@entities';
import { Spinner } from '@ui';
import { useGetPartners } from './services';

export const Partners = () => {
  const { data, isLoading } = useGetPartners();

  console.log('Fetched partners data:', data);

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (  
        <p>Нет партнеров для отображения</p>
      ) : (
        <PartnersList data={data?.data || []} /> 
      )}
    </section>
  );
};

import { BarUI, MapUI, useExportReportData } from '@entities';
import { barData } from './constants';

export const UsersArea = () => {
  const { data } = useExportReportData();
  return (
    <div className="flex-1 rounded-md bg-white shadow">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Пользователи по районам</h1>
      </header>
      <MapUI data={data?.usersByDistrict.map((r, i) => ({ ...r, id: i, name: r.district })) ?? []} />
      <BarUI data={barData} />
    </div>
  );
};

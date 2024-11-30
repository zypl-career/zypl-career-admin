import { Label, Legend, Pie, PieChart } from 'recharts';
import { Button, PieLabel, Spinner } from '@ui';
import { useExport } from '@hooks';
import { useExportReportData } from '../services';
import { colors } from './constants';
import { getPercent } from './utils';

export const AllVisitorsUI = () => {
  const { data, isLoading } = useExportReportData();
  const { isExportLoading, downloadHandler } = useExport('/statistics/users/export');

  const userData =
    data?.ageRangeStats
      .map((a) => ({ ...a, count: +a.count }))
      .filter((a) => a.count)
      .map((a, i) => ({ ...a, fill: colors[i] })) ?? [];

  const userDataWithPercent = getPercent(userData);
  return (
    <div className="rounded-md bg-white shadow">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Все посетители</h1>
        <Button variant="outline" disabled={isExportLoading} onClick={downloadHandler}>
          Экспортировать
        </Button>
      </header>
      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <PieChart width={436} height={436}>
            <Pie cornerRadius={10} innerRadius={140} outerRadius={200} data={userData} dataKey="count">
              <Legend />
              <Label
                position="center"
                content={
                  <PieLabel>
                    <p className="text-2xl font-bold text-[#212B36]">{data?.totalUsers}</p>
                    <p className="text-sm font-medium text-[#637381]">Пользователей</p>
                  </PieLabel>
                }
              />
            </Pie>
          </PieChart>
        )}
        <div className="grid grid-cols-2 place-content-center items-center gap-x-14 gap-y-2 py-4">
          {isLoading ? (
            <Spinner />
          ) : (
            userDataWithPercent.map((item, i) => {
              const name: string = JSON.parse(item.range).join('–');
              return (
                <div className="flex items-center justify-between gap-3" key={i}>
                  <div className="flex items-center gap-1.5">
                    <div style={{ backgroundColor: item.fill }} className="size-2.5 rounded-full" />
                    <span>{name}</span>
                  </div>
                  <p>{item.percent}%</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

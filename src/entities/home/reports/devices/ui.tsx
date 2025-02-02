import { Label, Pie, PieChart } from 'recharts';
import { PieLabel } from '@ui';

const data = [
  { name: 'Мобильный телефон', value: 45, fill: '#80CAEE' },
  { name: 'ПК', value: 12, fill: '#0FACCF' },
  { name: 'Планшет', value: 65, fill: '#3C50E0' },
  { name: 'Неизвестно', value: 34, fill: '#6577F3' },
];

export const DevicesUI = () => {
  return (
    <div className="rounded-md bg-white shadow">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Устройства</h1>
      </header>
      <div className="flex flex-col items-center justify-center">
        <PieChart width={436} height={436}>
          <Pie cornerRadius={10} innerRadius={140} outerRadius={200} data={data} dataKey="value">
            <Label
              position="center"
              content={
                <PieLabel>
                  <p className="text-2xl font-bold text-[#212B36]">2548</p>
                  <p className="text-sm font-medium text-[#637381]">Пользователей</p>
                </PieLabel>
              }
            />
          </Pie>
        </PieChart>
        <div className="grid grid-cols-2 place-content-center items-center gap-x-14 gap-y-2 py-4">
          {data.map((item, i) => (
            <div className="flex items-center justify-between gap-3" key={i}>
              <div className="flex items-center gap-1.5">
                <div style={{ backgroundColor: item.fill }} className="size-2.5 rounded-full" />
                <span>{item.name}</span>
              </div>
              <p>{item.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { FC, useMemo } from 'react';

export type TProgressRangeData = {
  name: string;
  value: number | string;
  barBgColor?: string;
};

export type TProgressRangeBar = {
  data: TProgressRangeData[];
};

export const ProgressRangeBar: FC<TProgressRangeBar> = ({ data }) => {
  const total = useMemo(() => data.reduce((acc, curr) => acc + Number(curr.value), 0), [data]);

  const result = useMemo(
    () =>
      data.map((item) => {
        const percentage = (Number(item.value) / total) * 100;
        return {
          ...item,
          percentage: percentage.toFixed(2),
        };
      }),
    [data, total],
  );

  return (
    <main className="flex">
      {result.map((item, i) => (
        <div
          key={i}
          style={{ backgroundColor: item.barBgColor, width: `${item.percentage}%` }}
          className="relative flex h-5 items-center first:rounded-l-full last:rounded-r-full"
        >
          <span className="absolute -top-5 text-sm">{item.name}</span>
          <span className="mx-3 text-sm text-white">{item.percentage}%</span>
        </div>
      ))}
    </main>
  );
};

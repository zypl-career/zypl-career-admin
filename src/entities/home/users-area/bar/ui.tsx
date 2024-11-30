import { FC } from 'react';
import { ProgressBar } from '@ui';
import { BarUIProps } from './types';

export const BarUI: FC<BarUIProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-5 border-t p-4">
      {data.map((item) => (
        <div className="flex justify-between" key={item.id}>
          <h1 className="flex-1">{item.name}</h1>
          <ProgressBar className="flex-[3]" percent={item.percent} showPercent />
        </div>
      ))}
    </div>
  );
};

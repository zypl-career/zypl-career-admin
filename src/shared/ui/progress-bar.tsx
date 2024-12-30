import { FC, HTMLAttributes } from 'react';
import { cn } from '../libs';

export type TProgressProps = HTMLAttributes<HTMLDivElement> & {
  showPercent?: boolean;
  barBgColor?: string;
  percent: number;
};

export const ProgressBar: FC<TProgressProps> = ({
  percent,
  showPercent = false,
  className,
  barBgColor = '#3056D3',
  ...props
}) => {
  return (
    <div className={cn('bg-[#E5E7EB] relative rounded h-5', className)} {...props}>
      <div
        className="absolute h-full rounded text-sm text-white"
        style={{ width: `${percent}%`, backgroundColor: barBgColor }}
      >
        {showPercent ? <p className="flex h-full items-center justify-center">{percent}%</p> : null}
      </div>
    </div>
  );
};

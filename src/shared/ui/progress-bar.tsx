import { FC, HTMLAttributes } from 'react';
import { cn } from '../libs';

export type TProgressProps = HTMLAttributes<HTMLDivElement> & {
  showPercent?: boolean;
  percent: number;
};

export const ProgressBar: FC<TProgressProps> = ({
  percent,
  showPercent = false,
  className,
  ...props
}) => {
  return (
    <div className={cn('bg-[#E5E7EB] relative rounded', className)} {...props}>
      <div
        className="absolute h-full rounded bg-[#3056D3] text-sm text-white"
        style={{ width: `${percent}%` }}
      >
        {showPercent ? (
          <p className="flex h-full items-center justify-center">{percent}%</p>
        ) : null}
      </div>
    </div>
  );
};

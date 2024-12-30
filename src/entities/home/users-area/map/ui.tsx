import { FC, useCallback, useMemo, useState } from 'react';
import { MouseTracker } from '@ui';
import { mapArea } from './constants';
import { TCounterBranches, TMapUIProps } from './types';

export const MapUI: FC<TMapUIProps> = ({ data }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState<Partial<TCounterBranches> | null>(null);

  const mapWithArea = useMemo(
    () =>
      mapArea.map((region) => {
        const area = data.find((area) => area.district === region.name);
        return { ...region, district: area?.district ?? '', count: area?.count ?? '' };
      }),
    [data],
  );

  const handleMouseEnter = useCallback((region: TCounterBranches) => {
    setDetail(region);
    setShowDetail(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setDetail(null);
    setShowDetail(false);
  }, []);

  return (
    <div className="m-6">
      <svg width="592" height="418" viewBox="0 0 592 418" fill="none" xmlns="http://www.w3.org/2000/svg">
        {mapWithArea.map((region, i) => (
          <path
            className="cursor-pointer hover:fill-[#3056D3]"
            onMouseEnter={() => handleMouseEnter(region)}
            onMouseLeave={handleMouseLeave}
            key={i}
            data-name={region.district}
            {...region?.path?.props}
          />
        ))}
      </svg>
      <MouseTracker trigger={showDetail}>
        {detail?.district} ({detail?.count})
      </MouseTracker>
    </div>
  );
};

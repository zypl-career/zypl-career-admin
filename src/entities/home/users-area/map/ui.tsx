import { FC, useCallback, useMemo, useState } from 'react';
import { MouseTracker } from '@ui';
import { mapArea } from './constants';
import { TCounterBranches, TMapUIProps } from './types';

export const MapUI: FC<TMapUIProps> = ({ data }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState<Partial<TCounterBranches> | null>(null);

  const map = useMemo(
    () =>
      data.map((region, i) => ({
        ...region,
        name: mapArea[i]?.name,
        path: mapArea.find((area) => area.name === region.district)?.path,
      })),
    [data],
  );

  // const symmetricDifference = [
  //   ...map.filter(item1 => mapArea.some(item2 => item1.district === item2.name)),
  //   ...mapArea.filter(item2 => map.some(item1 => item1.district === item2.name)),
  // ];

  // console.log(symmetricDifference);

  // const mergedArray: Item[] = Array.from(
  //   new Map(
  //     [...array1, ...array2].map(item => [item.id, item]) // Use 'id' as the key
  //   ).values(),
  // );

  // const mapWithArea = useMemo(() => {
  //   return map.map((region, i) => {
  //     const area = map.find((area) => area.district === region.name);
  //     // console.log(region?.path === undefined);
  //     return { ...region, path: area?.path };
  //   });
  // }, [map]);

  // console.log(data.map((region) => region.district));
  // console.log(mapArea.map((area) => area.name));

  // console.log(data.filter((region) => mapArea.some((area) => area.name !== region.district)));

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
        {map.map((region, i) => (
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

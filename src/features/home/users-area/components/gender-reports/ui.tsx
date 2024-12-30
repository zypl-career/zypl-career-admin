import { FC, useMemo } from 'react';
import { ProgressRangeBar } from '@ui';
import { genderColor, genderName } from './constants';
import { TGenderReportProps } from './types';

export const GenderReport: FC<TGenderReportProps> = ({ data }) => {
  const reports = useMemo(
    () =>
      data?.map((user) => ({
        name: genderName[user.gender],
        barBgColor: genderColor[user.gender],
        value: user.count,
      })) ?? [],
    [data],
  );
  return (
    <div className="border-t p-6">
      <ProgressRangeBar data={reports} />
    </div>
  );
};

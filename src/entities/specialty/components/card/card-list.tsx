import { FC } from 'react';
import { TSpecialtyCardProps } from '../types';
import { SpecialtyCardItem } from './card-item';

export const SpecialtyCardList: FC<TSpecialtyCardProps> = ({ data, ...props }) => {
  return data.map((item) => <SpecialtyCardItem key={item.id} data={item} {...props} />);
};

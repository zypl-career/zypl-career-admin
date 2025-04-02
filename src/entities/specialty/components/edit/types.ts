import { TSpecialty } from '../../types';

export type TUpdateSpecialtyProps = {
  data: Partial<TSpecialty>;
  open: boolean;
  toggle: (open: boolean) => void;
};

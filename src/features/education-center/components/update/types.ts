import type { TEducationCenter } from '@entities';

export type TUpdateEducationCenterProps = {
  data: Partial<TEducationCenter>;
  open: boolean;
  toggle: (open: boolean) => void;
};

import { TUniversity } from '@entities';

export type TDeleteUniversityProps = {
  id?: TUniversity['id'];
  open: boolean;
  setOpen: (state: boolean) => void;
};

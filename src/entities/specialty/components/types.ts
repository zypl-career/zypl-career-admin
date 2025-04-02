import { TSpecialty } from '../types';

export type TSpecialtyCardProps = {
  data: TSpecialty[];
  onDelete: (specialty: TSpecialty) => void;
  onEdit: (specialty: TSpecialty) => void;
};

export type TSpecialtyCardItemProps = {
  data: TSpecialty;
  onDelete: (specialty: TSpecialty) => void;
  onEdit: (specialty: TSpecialty) => void;
};

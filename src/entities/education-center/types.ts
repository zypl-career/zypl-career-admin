export type TEducationCenter = {
  id: string;
  title: string;
  city: string;
  createdAt: number;
  image: string;
};

export type TEducationCenterProps = {
  data: TEducationCenter[];
  onEdit: (data: TEducationCenter) => void;
  onDelete: (data: TEducationCenter) => void;
};

export type TUniversity = {
  id: string;
  name: string;
  city: string;
  generalInfo: string;
};

export type TUniversityProps = {
  data: TUniversity[];
  onEdit: (data: TUniversity) => void;
  onDelete: (data: TUniversity) => void;
};

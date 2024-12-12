export type TUserFastData = {
  gender: 'male' | 'female';
  age: number;
  district: string;
  createdAt: number;
  updatedAt: number;
};

export type TUserTableProps = {
  data: TUserFastData[];
  onEdit: (user: TUserFastData) => void;
  onDelete: (user: TUserFastData) => void;
};

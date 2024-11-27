export type TUser = {
  total: number;
  page: number;
  limit: number;
  data: TUserData[];
};

export type TUserData = {
  id: string | number;
  name: string;
  surname: string;
  patronymic: string;
  gender: "male" | "female";
  age: number;
  district: string;
  role: string;
  school: string;
  email: string;
  password: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
};

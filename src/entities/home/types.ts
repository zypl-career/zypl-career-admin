export type TUserStatistic = {
  totalUsers: number;
  usersByGender: UsersByGender[];
  usersByRole: UsersByRole[];
  usersByDistrict: UsersByDistrict[];
  ageRangeStats: AgeRangeStat[];
};

export type TGenders = 'male' | 'female';

export type UsersByGender = {
  gender: TGenders;
  count: string;
};

export type UsersByRole = {
  role: string;
  count: string;
};

export type UsersByDistrict = {
  district: string;
  count: any;
};

export type AgeRangeStat = {
  range: string;
  count: number;
};

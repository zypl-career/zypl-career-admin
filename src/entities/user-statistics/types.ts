export type TUserStatistics = {
  totalUsers: number;
  usersByGender: {
    gender: string;
    count: number;
  }[];
  usersByRole: {
    role: string;
    count: number;
  }[];
  usersByDistrict: {
    district: string;
    count: number;
  }[];
};

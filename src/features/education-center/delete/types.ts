export type TEducationCenterData = {
  id: string;
  image: string;
  title: string;
  generalInfoFile: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type TDeleteEducationCenterProps = {
  id: TEducationCenterData["id"];
  open: boolean;
  setOpen: (state: boolean) => void;
};

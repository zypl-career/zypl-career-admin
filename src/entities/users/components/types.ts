import { TUserData } from "..";

export type TUserTableProps = {
  data: TUserData[];
  onEdit: (user: TUserData) => void;
  onDelete: (id: TUserData["id"]) => void;
};

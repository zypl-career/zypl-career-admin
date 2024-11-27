import { TUserData } from "@/entities";

export type TDeleteProps = {
  id: TUserData["id"];
  open: boolean;
  setOpen: (state: boolean) => void;
};

import { TArticleData } from "@entities";

export type TDeleteProps = {
  id: TArticleData["id"];
  open: boolean;
  setOpen: (state: boolean) => void;
};

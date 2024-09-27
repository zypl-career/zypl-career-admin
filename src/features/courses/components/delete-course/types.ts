import { TCourseData } from "@entities";

export type TDeleteProps = {
  id: TCourseData['id'];
  open: boolean;
  setOpen: (state: boolean) => void;
}
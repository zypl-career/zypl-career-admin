import { z } from "zod";
import { UserSchema } from "./schema";
import { TUserData } from "@entities";

export type TEditUserProps = {
  editable?: Partial<TUserData>;
  toggle: boolean;
  setToggle: (value: boolean) => void;
};

export type TUserSchema = z.infer<typeof UserSchema> & TUserData;

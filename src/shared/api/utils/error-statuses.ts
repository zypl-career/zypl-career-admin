import { redirect } from "react-router-dom";
import { toast } from "@ui";
import { unauthenticate } from "./utils";

export const errorStatus: Record<number, (msg?: string) => void> = {
  400: (msg?: string) =>
    toast({ title: "Данные не найдены", description: msg, variant: "warning" }),
  403: (msg?: string) => unauthenticate(msg),
  404: () => redirect("/404"),
  401: (msg?: string) => unauthenticate(msg),
  500: () => redirect("/"),
};

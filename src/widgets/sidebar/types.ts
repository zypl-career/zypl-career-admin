import { ReactNode } from "react";

export type TSidebarMenu = {
  title: string;
  link: string;
  icon?: ReactNode;
  children?: TSidebarMenu[];
};

export type TSidebarItemMenuProps = {
  item: TSidebarMenu;
};

export type TSidebarMenuProps = {
  data: TSidebarMenu[];
};

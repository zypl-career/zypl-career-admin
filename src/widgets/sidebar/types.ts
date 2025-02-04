import { ReactNode } from 'react';

export type TSidebarMenu = {
  title: string;
  link: string;
  icon?: ReactNode;
  children?: TSidebarMenu[];
};

export type TSidebarItemMenuProps = {
  item: TSidebarMenu;
  isChild?: boolean;
};

export type TSidebarMenuProps = {
  data: TSidebarMenu[];
  isChild?: boolean;
};

import { FC } from 'react';
import { TSidebarMenuProps } from '../types';
import { SidebarMenuItemUI } from './sidebar-menuI-item';

export const SidebarMenuUI: FC<TSidebarMenuProps> = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <SidebarMenuItemUI key={index} item={item} />
      ))}
    </ul>
  );
};

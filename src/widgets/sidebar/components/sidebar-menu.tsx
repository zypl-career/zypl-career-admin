import { FC } from 'react';
import { TSidebarMenuProps } from '../types';
import { SidebarMenuItemUI } from './sidebar-menuI-item';

export const SidebarMenuUI: FC<TSidebarMenuProps> = ({ data, isChild }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <SidebarMenuItemUI key={index} item={item} isChild={isChild} />
      ))}
    </ul>
  );
};

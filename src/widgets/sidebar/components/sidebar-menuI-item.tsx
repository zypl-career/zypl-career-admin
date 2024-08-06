import { FC, useCallback, useState } from 'react';
import { cn } from '@libs';
import { NavLink } from 'react-router-dom';
import { TSidebarItemMenuProps } from '../types';
import { SidebarMenuUI } from './sidebar-menu';
import { ChevronRight } from 'lucide-react';

export const SidebarMenuItemUI: FC<TSidebarItemMenuProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    },
    [],
  );

  return (
    <li>
      <NavLink
        to={item.link}
        onClick={handleDropdown}
        className={({ isActive }) =>
          cn(
            'mb-4 flex items-center gap-2 rounded-md p-2 text-sm hover:bg-secondary-active text-white ',
            { 'bg-secondary-active': isActive },
          )
        }
      >
        {item.icon}
        <span>{item.title}</span>
        {item.children ? <ChevronRight className={cn({ 'rotate-90': isOpen })} /> : null}
      </NavLink>
      {isOpen && item.children ? (
        <div className="ml-2">
          <SidebarMenuUI data={item.children} />
        </div>
      ) : null}
    </li>
  );
};

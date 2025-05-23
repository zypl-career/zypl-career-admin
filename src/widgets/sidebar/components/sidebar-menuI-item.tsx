import { cn } from '@libs';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { FC, useCallback, useState } from 'react';
import { TSidebarItemMenuProps } from '../types';
import { SidebarMenuUI } from './sidebar-menu';

export const SidebarMenuItemUI: FC<TSidebarItemMenuProps> = ({ item, isChild }) => {
  const [isOpen, setIsOpen] = useState(isChild);

  const handleDropdown = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <li>
      <NavLink
        to={item.link}
        onClick={item.children ? handleDropdown : undefined}
        className={({ isActive }) =>
          cn('mb-4 flex items-center gap-2 rounded-md p-2 text-sm hover:bg-secondary-active text-white ', {
            'bg-secondary-active': isActive,
          })
        }
      >
        {item.icon}
        <span>{item.title}</span>
        {item.children ? <ChevronRight className={cn({ 'rotate-90': isOpen })} /> : null}
      </NavLink>
      {isOpen && item.children ? (
        <div className="ml-4 border-l border-white/80 pl-2">
          <SidebarMenuUI data={item.children} isChild={isOpen} />
        </div>
      ) : null}
    </li>
  );
};

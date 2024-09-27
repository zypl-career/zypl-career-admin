import { Link } from 'react-router-dom';
import { SidebarMenuUI } from './components/sidebar-menu';
import { menu } from './constants';
import LogoZypl from '@/shared/assets/img/logo-zypl';

export const Sidebar = () => {
  return (
    <aside className="bg-secondary-100 px-2 py-4 sticky top-0 left-0 h-dvh overflow-y-auto">
      <Link to="/" className="flex justify-center mb-5">
        <LogoZypl />
      </Link>
      <nav>
        <SidebarMenuUI data={menu} />
      </nav>
    </aside>
  );
};

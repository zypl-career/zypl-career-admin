import { Link } from 'react-router-dom';
import { SidebarMenuUI } from './components/sidebar-menu';
import { menu } from './constants';
import LogoZypl from '@/shared/assets/img/logo-zypl';

export const Sidebar = () => {
  return (
    <aside className="bg-secondary-100 px-2 py-4">
      <Link to="/" className="flex justify-center mb-5">
        <LogoZypl />
      </Link>
      <nav>
        <SidebarMenuUI data={menu} />
      </nav>
    </aside>
  );
};

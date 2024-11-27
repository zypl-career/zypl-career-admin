import LogoZypl from '@/shared/assets/img/logo-zypl';
import { Link } from 'react-router-dom';
import { SidebarMenuUI } from './components/sidebar-menu';
import { menu } from './constants';

export const Sidebar = () => {
  return (
    <aside className="sticky left-0 top-0 h-dvh overflow-y-auto bg-secondary-100 px-2 py-4">
      <Link to="/" className="mb-5 flex justify-center">
        <LogoZypl />
      </Link>
      <nav>
        <SidebarMenuUI data={menu} />
      </nav>
    </aside>
  );
};

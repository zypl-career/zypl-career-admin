import { Pages } from '@constants';
import { Sidebar, Header } from '@/widgets';
import { getAccessToken } from '@libs';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const isAuth = !!getAccessToken();
  return (
    <main className="flex size-full">
      {isAuth ? (
        <>
          <Sidebar />
          <div className="w-full flex-1 overflow-hidden">
            <Header />
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <div>
          Извините, кажется, Вы не авторизованы, пожалуйста,{' '}
          <Link to={Pages.SignIn} className="text-primary">
            авторизуйтесь
          </Link>
        </div>
      )}
    </main>
  );
};

export default MainLayout;

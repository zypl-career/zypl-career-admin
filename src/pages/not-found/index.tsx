import { Button } from '@ui';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-500">Страница в разработке 🛠</p>
      <Button asChild>
        <Link to="/">На главную</Link>
      </Button>
    </main>
  );
};

export default NotFoundPage;

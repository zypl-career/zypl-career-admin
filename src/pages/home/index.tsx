import { Reports } from '@/features/home';
import { UsersArea } from '@/features/home/users-area/ui';

const HomePage = () => {
  return (
    <main>
      <h1 className="my-5 text-2xl font-bold">Отчеты о пользователях и посетителях</h1>
      <div className="flex gap-4">
        <Reports />
        <UsersArea />
      </div>
    </main>
  );
};

export default HomePage;

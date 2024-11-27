import { Reports } from "@/features/home";
import { UsersArea } from "@/features/home/users-area/ui";

const HomePage = () => {
  return (
    <main>
      <h1 className="font-bold text-2xl my-5">
        Отчеты о пользователях и посетителях
      </h1>
      <div className="flex gap-4">
        <Reports />
        <UsersArea />
      </div>
    </main>
  );
};

export default HomePage;

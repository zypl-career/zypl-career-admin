import { Button } from "@ui";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="w-full h-dvh flex flex-col gap-5 justify-center items-center">
      <h1 className="text-4xl text-gray-800 font-bold">404</h1>
      <p className="text-2xl text-gray-500">Страница в разработке 🛠</p>
      <Button asChild>
        <Link to="/">На главную</Link>
      </Button>
    </main>
  );
};

export default NotFoundPage;

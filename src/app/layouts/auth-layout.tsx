import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // const isAuth = !!getAccessToken();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate('/');
  //   }
  // }, [isAuth, navigate]);
  return (
    <main className="h-full bg-hero-pattern bg-cover bg-center">
      <Outlet />
    </main>
  );
};

export default AuthLayout;

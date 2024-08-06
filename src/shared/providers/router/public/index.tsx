import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Pages } from '@constants';
import AuthLayout from '@/app/layouts/auth-layout';

const AuthSignInPage = lazy(() => import('@pages/sign-in'));

export const publicRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: Pages.SignIn,
        element: <AuthSignInPage />,
      },
    ],
  },
];

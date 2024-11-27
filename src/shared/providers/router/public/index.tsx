/* eslint-disable react-refresh/only-export-components */
import AuthLayout from '@/app/layouts/auth-layout';
import { Pages } from '@constants';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

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

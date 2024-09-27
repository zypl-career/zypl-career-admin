import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '@/app/layouts/main-layout';

const HomePage = lazy(() => import('@pages/home'));
const UsersPage = lazy(() => import('@pages/users'));
const CoursesPage = lazy(() => import('@pages/courses'));
const CourseCreatePage = lazy(() => import('@pages/course-create'));
const CourseUpdatePage = lazy(() => import('@pages/course-update'));

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'course/create',
        element: <CourseCreatePage />,
      },
      {
        path: 'course/update/:id',
        element: <CourseUpdatePage />,
      },
    ],
  },
];

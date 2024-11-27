/* eslint-disable react-refresh/only-export-components */
import MainLayout from '@/app/layouts/main-layout';
import NotFoundPage from '@/pages/not-found';
import PartnersPage from '@pages/partners';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('@pages/home'));
const UsersPage = lazy(() => import('@pages/users'));

const CoursesPage = lazy(() => import('@pages/courses'));
const CourseCreatePage = lazy(() => import('@pages/course-create'));
const CourseUpdatePage = lazy(() => import('@pages/course-update'));

const LessonCreatePage = lazy(() => import('@pages/lessons-create'));
const LessonsByIdPage = lazy(() => import('@pages/lessons-id'));

const ArticlesPage = lazy(() => import('@pages/articles'));
const ArticlePageId = lazy(() => import('@pages/article-id'));
const ArticleCreatePage = lazy(() => import('@/pages/article-create'));
const ArticleEditPage = lazy(() => import('@/pages/article-edit'));
const EducationCenterPage = lazy(() => import('@pages/education-center'));

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
        path: 'education-center',
        element: <EducationCenterPage />,
      },
      {
        path: 'course/create',
        element: <CourseCreatePage />,
      },
      {
        path: 'course/update/:id',
        element: <CourseUpdatePage />,
      },
      {
        path: 'course/:id/lesson',
        element: <LessonsByIdPage />,
      },
      {
        path: 'course/:id/lesson-create',
        element: <LessonCreatePage />,
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
      },
      {
        path: 'articles/create',
        element: <ArticleCreatePage />,
      },
      {
        path: 'articles/:id',
        element: <ArticlePageId />,
      },
      {
        path: 'articles/:id/edit',
        element: <ArticleEditPage />,
      },
      {
        path: 'partners',
        element: <PartnersPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

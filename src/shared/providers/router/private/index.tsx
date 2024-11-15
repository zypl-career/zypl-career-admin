/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "@/app/layouts/main-layout";
import NotFoundPage from "@/pages/not-found";

const HomePage = lazy(() => import("@pages/home"));
const UsersPage = lazy(() => import("@pages/users"));
const CoursesPage = lazy(() => import("@pages/courses"));
const CourseCreatePage = lazy(() => import("@pages/course-create"));
const CourseUpdatePage = lazy(() => import("@pages/course-update"));
const LessonCreatePage = lazy(() => import("@pages/lessons-create"));
const LessonsByIdPage = lazy(() => import("@pages/lessons-id"));
const ArticlesPage = lazy(() => import("@pages/articles"));
const ArticlePageId = lazy(() => import("@pages/article-id"));

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "course/create",
        element: <CourseCreatePage />,
      },
      {
        path: "course/update/:id",
        element: <CourseUpdatePage />,
      },
      {
        path: "course/:id/lesson",
        element: <LessonsByIdPage />,
      },
      {
        path: "course/:id/lesson-create",
        element: <LessonCreatePage />,
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
      },
      {
        path: 'articles/:id',
        element: <ArticlePageId />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

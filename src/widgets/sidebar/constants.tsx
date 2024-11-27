import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  CategoriesIcon,
  HashtagIcon,
  MediaFilesIcon,
} from "@icons";
import { TSidebarMenu } from "./types";

export const menu: TSidebarMenu[] = [
  {
    title: "Главная",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Пользователи",
    link: "/users",
    icon: <UsersIcon />,
  },
  {
    title: "Роли",
    link: "/rules",
    icon: <UserGroupIcon />,
  },
  {
    title: "Тесты",
    link: "/tests",
    icon: <HashtagIcon />,
  },
  {
    title: "Инструменты для вдохновения",
    link: "/accepted",
    icon: <CategoriesIcon />,
    children: [
      {
        title: "Партнеры",
        link: "/partners",
      },
      {
        title: "Профессии",
        link: "/professions",
      },
      {
        title: "Отрасли",
        link: "/industries",
      },
      {
        title: "Образовательные центры",
        link: "/education-center",
      },
      {
        title: "Курсы",
        link: "/courses",
      },
      {
        title: "Статьи",
        link: "/articles",
      },
      {
        title: "Вузы и колледжи",
        link: "/universities",
      },
      {
        title: "Ресурсы для соискателей",
        link: "/resources",
      },
      {
        title: "Учебные центры",
        link: "/training-centers",
      },
      {
        title: "Видео с руководством пользователя",
        link: "/video-guide",
      },
    ],
  },
  {
    title: "Медиафайли",
    link: "/beginners",
    icon: <MediaFilesIcon />,
    children: [
      {
        title: "Все",
        link: "all",
      },
      {
        title: "Видео",
        link: "videos",
      },
      {
        title: "Фото",
        link: "photos",
      },
      {
        title: "Файли",
        link: "files",
      },
    ],
  },
  {
    title: "Теги",
    link: "/polls",
    icon: <HashtagIcon />,
  },
];

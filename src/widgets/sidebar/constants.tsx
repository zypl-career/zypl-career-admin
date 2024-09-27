import { HomeIcon, UsersIcon, UserGroupIcon, CategoriesIcon, HashtagIcon, MediaFilesIcon } from '@icons';
import { TSidebarMenu } from './types';

export const menu: TSidebarMenu[] = [
  {
    title: 'Главная',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'Пользователи',
    link: '/users',
    icon: <UsersIcon />,
  },
  {
    title: 'Роли',
    link: '/rules',
    icon: <UserGroupIcon />,
  },
  {
    title: 'Тесты',
    link: '/tests',
    icon: <HashtagIcon />,
  },
  {
    title: 'Инструменты для вдохновения',
    link: '/accepted',
    icon: <CategoriesIcon />,
    children: [
      {
        title: 'Профессии',
        link: '/accepted',
      },
      {
        title: 'Отрасли',
        link: '/accepted',
      },
      {
        title: 'Курсы',
        link: '/courses',
      },
      {
        title: 'Вузы и колледжи ',
        link: '/accepted',
      },
      {
        title: 'Ресурсы для соискателей',
        link: '/accepted',
      },
      {
        title: 'Учебные центры',
        link: '/accepted',
      },
      {
        title: 'Видео с руководством пользователя ',
        link: '/accepted',
      },
    ]
  },
  {
    title: 'Медиафайли',
    link: '/beginners',
    icon: <MediaFilesIcon />,
    children: [
      {
        title: 'Все',
        link: ''
      },
      {
        title: 'Видео',
        link: ''
      },
      {
        title: 'Фото',
        link: ''
      },
      {
        title: 'Файли',
        link: ''
      },
    ],
  },
  {
    title: 'Теги',
    link: '/polls',
    icon: <HashtagIcon />,
  },
];

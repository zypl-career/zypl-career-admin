import { createBrowserRouter } from 'react-router-dom';
import { privateRoutes } from './private';
import { publicRoutes } from './public';

export const router = createBrowserRouter(publicRoutes.concat(privateRoutes));

import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public';
import { privateRoutes } from './private';

export const router = createBrowserRouter(publicRoutes.concat(privateRoutes));

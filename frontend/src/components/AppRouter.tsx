import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './Routes';

const router = createBrowserRouter(routes);

type screenConfig = {
  path: string;
  title: string;
  subtitle: string;
};

export const screenConfig: Array<screenConfig> = [
  // {
  //   path: '/',
  // },
  {
    path: 'message/*',
    title: 'message',
    subtitle: 'message_subtitle',
  },
  {
    path: 'contact/*',
    title: 'contact',
    subtitle: 'contact_subtitle',
  },
  {
    path: 'configuration/*',
    title: 'configuration',
    subtitle: 'configuration_subtitle',
  },
  {
    path: 'profile/*',
    title: 'profile',
    subtitle: 'profile_subtitle',
  },
];

export const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { HomeScreen } from './components/HomeScreen';
import { NotFoundScreen } from './components/NotFoundScreen';
import { Layout } from './components/shared/Layout';
// import MessageScreen from './components/MessageScreen';
import { ContactScreen } from './components/ContactScreen';
import { ConfigurationScreen } from './components/ConfigurationScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { lazy, LazyExoticComponent } from 'react';
import { LoginScreen } from './components/LoginScreen';

const MessageScreen = lazy(() => import('./components/MessageScreen'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/*',
    element: <Layout />,
    errorElement: <NotFoundScreen />,
    children: [
      { index: true, element: <HomeScreen /> },

      { path: 'message/*', element: <MessageScreen /> },

      { path: 'contact/*', element: <ContactScreen /> },
      {
        path: 'configuration/*',
        element: <ConfigurationScreen />,
      },
      { path: 'profile/*', element: <ProfileScreen /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

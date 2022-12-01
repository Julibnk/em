import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NotFoundScreen } from './components/NotFoundScreen';
import { Layout } from './components/shared/Layout';
import { lazy, Suspense } from 'react';
import { FullPageLoader } from './components/shared/Layout/FullPageLoader/index';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const ContactScreen = lazy(() => import('./components/ContactScreen'));
const MessageScreen = lazy(() => import('./components/MessageScreen'));
const ConfigurationScreen = lazy(
  () => import('./components/ConfigurationScreen')
);
const ProfileScreen = lazy(() => import('./components/ProfileScreen'));
const LoginScreen = lazy(() => import('./components/LoginScreen'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<FullPageLoader />}>
        <LoginScreen />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundScreen />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <HomeScreen />
          </Suspense>
        ),
      },

      {
        path: 'message/*',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <MessageScreen />
          </Suspense>
        ),
      },

      {
        path: 'contact/*',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <ContactScreen />
          </Suspense>
        ),
      },
      {
        path: 'configuration/*',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <ConfigurationScreen />
          </Suspense>
        ),
      },
      {
        path: 'profile/*',
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <ProfileScreen />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

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
    path: '/*',
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

// {
//   path: 'home/*',
//   component: lazy(() => import('../components/HomeScreen')),
// },
// {
//   path: 'message/*',
//   title: i18n.t('message', { count: 0 }) || undefined,
//   subtitle: i18n.t('message_subtitle') || undefined,
//   component: lazy(() => import('../components/MessageScreen')),
// },
// {
//   path: 'contact/*',
//   title: i18n.t('contact', { count: 0 }) || undefined,
//   subtitle: i18n.t('contact_subtitle') || undefined,
//   component: lazy(() => import('../components/ContactScreen')),
// },
// {
//   path: 'configuration/*',
//   title: i18n.t('configuration', { count: 0 }) || undefined,
//   subtitle: i18n.t('configuration_subtitle') || undefined,
//   component: lazy(() => import('../components/ConfigurationScreen')),
// },
// {
//   path: 'profile/*',
//   title: i18n.t('profile') || undefined,
//   subtitle: i18n.t('profile_subtitle') || undefined,
//   component: lazy(() => import('../components/ProfileScreen')),
// },

export const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

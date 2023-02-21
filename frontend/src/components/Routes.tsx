import { NotFoundScreen } from './Shared/NotFoundScreen/NotFoundScreen';
import { Layout } from './Shared/Layout';
import { lazy, Suspense } from 'react';
import { LoadingOverlay } from './Shared/Loading';
import { PublicRoute } from './Shared/PublicRoute';
import { PrivateRoute } from './Shared/PrivateRoute';

const LoginScreen = lazy(() => import('./LoginScreen'));
const HomeScreen = lazy(() => import('./HomeScreen'));
const ContactScreen = lazy(() => import('./ContactScreen'));
const ConfigurationScreen = lazy(
  () => import('./ConfigurationScreen/ConfigurationScreen')
);
const ProfileScreen = lazy(() => import('./ProfileScreen/ProfileScreen'));
const MessageListScreen = lazy(() => import('./MessageScreen/MessageScreen'));
const MessageLoadScreen = lazy(
  () => import('./MessageLoadScreen/MessageLoadScreen')
);

export const routes = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingOverlay loading />}>
        <PublicRoute>
          <LoginScreen />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: '/*',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    errorElement: <NotFoundScreen />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingOverlay loading />}>
            <HomeScreen />
          </Suspense>
        ),
      },

      // {
      //   path: 'message/*',
      //   children: [
      //     {
      //       index: true,
      //       element: (
      //         <Suspense fallback={<LoadingOverlay loading />}>
      //           <MessageListScreen />
      //         </Suspense>
      //       ),
      //     },
      //     {
      //       path: 'load',
      //       element: (
      //         <Suspense fallback={<LoadingOverlay loading />}>
      //           <MessageLoadScreen />
      //         </Suspense>
      //       ),
      //     },
      //   ],
      // },
      {
        path: 'message/*',
        element: (
          <Suspense fallback={<LoadingOverlay loading />}>
            <MessageListScreen />
          </Suspense>
        ),
      },
      {
        path: 'contact/*',
        element: (
          <Suspense fallback={<LoadingOverlay loading />}>
            <ContactScreen />
          </Suspense>
        ),
      },
      {
        path: 'configuration/*',
        element: (
          <Suspense fallback={<LoadingOverlay loading />}>
            <ConfigurationScreen />
          </Suspense>
        ),
      },
      {
        path: 'profile/*',
        element: (
          <Suspense fallback={<LoadingOverlay loading />}>
            <ProfileScreen />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingOverlay loading />}>
            <NotFoundScreen />
          </Suspense>
        ),
      },
    ],
  },
];

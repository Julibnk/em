import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NotFoundScreen } from './Shared/NotFoundScreen/NotFoundScreen';
import { Layout } from './Shared/Layout';
import { lazy, Suspense } from 'react';

import { LoadingOverlay } from './Shared/Loading';

const HomeScreen = lazy(() => import('./HomeScreen'));
const ContactScreen = lazy(() => import('./ContactScreen'));
const MessageScreen = lazy(() => import('./MessageScreen'));
const ConfigurationScreen = lazy(
  () => import('./ConfigurationScreen/ConfigurationScreen')
);
const ProfileScreen = lazy(() => import('./ProfileScreen/ProfileScreen'));
const LoginScreen = lazy(() => import('./LoginScreen'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingOverlay loading />}>
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
          <Suspense fallback={<LoadingOverlay loading />}>
            <HomeScreen />
          </Suspense>
        ),
      },

      {
        path: 'message/*',
        element: (
          <Suspense fallback={<LoadingOverlay loading />}>
            <MessageScreen />
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

// import { Suspense, lazy } from "react";
// import { Suspense } from "react";
// import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

// import FullPageLoader from "@components/FullPageLoader/FullPageLoader";
// import PublicRoutes from "@components/Routes/PublicRoutes";

// import { ProtectedRoutes } from './components/shared/Routes/ProtectedRoutes';
// import { PrivateRoutes } from './components/shared/Routes/PrivateRoutes';

// const LoginPage = lazy(() => import("@views/Login/LoginPage"));
// const NotFoundComponent = lazy(
//   () => import("@components/Routes/NotFoundComponent")
// );

// export const AppRouter = () => {
// return (
<></>;
// <Router>
//   {/* <Suspense fallback={<FullPageLoader />}> */}
//   {/* <Suspense> */}
//   <Routes>
//     {/* <Route path="/" element={<PublicRoutes />}>
//         <Route path="login/*" element={<h1></h1>} />
//       </Route> */}

//     <Route element={<PrivateRoutes />}>
//       <Route path='/*' element={<ProtectedRoutes />} />
//     </Route>

//     {/* <Route path="*">
//         <Route element={<NotFoundComponent />} />
//       </Route> */}
//   </Routes>
//   {/* </Suspense> */}
// </Router>
// );
// };

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
{
  /* <></>; */
}
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

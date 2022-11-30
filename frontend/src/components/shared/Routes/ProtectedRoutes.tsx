import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { routes } from '../../../config';
import Layout from '../Layout';

const ProtectedRoutes = () => {
  // const HomeScreen = lazy(() => import('../../views/HomeScreen'));
  // const MessageScreen = lazy(() => import('../../views/MessageScreen'));
  // const ContactScreen = lazy(() => import('../../views/ContactScreen'));
  // const ConfigurationScreen = lazy(
  //   () => import('../../views/ConfigurationScreen')
  // );
  // const ProfileScreen = lazy(() => import('../../views/ProfileScreen'));

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route
          path='home/*'
          element={
            <Suspense>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path='message/*'
          element={
            <Suspense>
              <MessageScreen />
            </Suspense>
          }
        />
        <Route
          path='contact/*'
          element={
            <Suspense>
              <ContactScreen />
            </Suspense>
          }
        />
        <Route
          path='configuration/*'
          element={
            <Suspense>
              <ConfigurationScreen />
            </Suspense>
          }
        />
        <Route
          path='profile/*'
          element={
            <Suspense>
              <ProfileScreen />
            </Suspense>
          }
        /> */}

        {routes.map(({ path, component: Component }, i) => {
          return (
            <Route
              key={i}
              path={path}
              element={
                <Suspense>
                  <Component />
                </Suspense>
              }
            />
          );
        })}

        {/* <Route path='/*' element={<Navigate to='home'></Navigate>}></Route> */}
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;

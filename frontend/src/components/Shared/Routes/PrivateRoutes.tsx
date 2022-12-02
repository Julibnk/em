import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from '../../../config/store';

export const PrivateRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={`/login`} state={{ from: location }} />
  );
};

import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContextProvider';

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const {
    authState: { authorized },
  } = useAppContext();

  const location = useLocation();

  if (!authorized) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

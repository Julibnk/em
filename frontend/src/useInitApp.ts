import { useEffect } from 'react';
import { useAppContext } from './AppContextProvider';

export const useInitApp = () => {
  const {
    authState: { authorized },
  } = useAppContext();

  useEffect(() => {
    if (authorized) {
      console.log('Login');
    }
  }, [authorized]);
};

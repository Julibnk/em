import { useLayoutEffect } from 'react';
import { initApp } from '../../Auth/auth-slice';
import { useDispatch } from '../../config/store';

export const useInitApp = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(initApp('develop'));
  }, [dispatch]);
};

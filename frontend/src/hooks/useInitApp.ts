import { useLayoutEffect } from 'react';
import { initApp } from '../store/auth-slice';
import { useDispatch } from '../store/store';

export const useInitApp = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(initApp('develop'));
  }, [dispatch]);
};

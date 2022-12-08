import { useRouteError } from 'react-router-dom';
import { ScreenContent } from '../Layout/ScreenContent';
import { NotFoundContent } from './NotFoundContent';

export const NotFoundScreen = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <ScreenContent>
      <NotFoundContent></NotFoundContent>
    </ScreenContent>
  );
};

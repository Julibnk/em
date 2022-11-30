import { useRouteError } from 'react-router-dom';

export const NotFoundScreen = () => {
  const error = useRouteError();
  console.log(error);
  return <h1>No encontrado</h1>;
};

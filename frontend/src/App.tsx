import './App.css';

import { Modals } from './Modals';
import { AppRouter } from './AppRouter';
import { useInitApp } from './shared/hooks/useInitApp';
import { MantineProvider } from './MantineProvider';

export const App = () => {
  useInitApp();

  return (
    <MantineProvider>
      <AppRouter />
      <Modals />
    </MantineProvider>
  );
};

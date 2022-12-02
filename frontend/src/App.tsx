import './App.css';

import { Modals } from './components/Modals';
import { AppRouter } from './AppRouter';
import { useInitApp } from './hooks/useInitApp';
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

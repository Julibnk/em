import './App.css';

import { Modals } from './components/Modals';
import { AppRouter } from './components/AppRouter';
import { useInitApp } from './Shared/hooks/useInitApp';
import { MantineProvider } from './components/MantineProvider';

export const App = () => {
  useInitApp();

  return (
    <MantineProvider>
      <AppRouter />
      <Modals />
    </MantineProvider>
  );
};

import './App.css';

// import { Modals } from './components/Modals';
import { AppRouter } from './components/AppRouter';
import { useInitApp } from './core/Shared/hooks/useInitApp';
import { MantineProvider } from './components/MantineProvider';
import { NotificationsProvider } from '@mantine/notifications';

export const App = () => {
  useInitApp();

  return (
    <MantineProvider>
      <NotificationsProvider>
        <AppRouter />
      </NotificationsProvider>
    </MantineProvider>
  );
};

import { AppRouter } from './components/AppRouter';
import { useInitApp } from './components/Shared/hooks/useInitApp';
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

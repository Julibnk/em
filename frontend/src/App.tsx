import { AppRouter } from './components/AppRouter';
import { useInitApp } from './useInitApp';
import { MantineProvider } from './components/Shared/Mantine/MantineProvider';
import { NotificationsProvider } from '@mantine/notifications';
import { RestMasterdataRepository } from './core/Shared/Masterdata/RestMasterdataRepository';
import { AppContextProvider } from './AppContextProvider';

const masterdataRepository = RestMasterdataRepository.create();

const AppWrapper = () => {
  return (
    <AppContextProvider masterdataRepository={masterdataRepository}>
      <App />
    </AppContextProvider>
  );
};

const App = () => {
  useInitApp();

  return (
    <MantineProvider>
      <NotificationsProvider>
        <AppRouter />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default AppWrapper;

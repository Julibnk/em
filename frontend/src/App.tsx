import './App.css';

import { MantineProvider, MantineProviderProps } from '@mantine/core';
import { theme } from './config';

import { Modals } from './components/Modals';
import { AppRouter } from './AppRouter';
import { useInitApp } from './hooks/useInitApp';

const providerProps: MantineProviderProps = {
  children: <></>,

  theme: {
    components: {
      Button: { classNames: { label: 'button_label' } },
      TextInput: { classNames: { label: 'input_label' } },
      MultiSelect: { classNames: { label: 'input_label' } },
      Select: { classNames: { label: 'input_label' } },
      Textarea: { classNames: { label: 'input_label' } },
    },
    ...theme,
  },
  withCSSVariables: true,
  withGlobalStyles: true,
  withNormalizeCSS: true,
};

export const App = () => {
  useInitApp();

  return (
    <MantineProvider {...providerProps}>
      {/* // {fullPageLoading && <FullPageLoader />} */}
      <AppRouter />
      <Modals />
    </MantineProvider>
  );
};

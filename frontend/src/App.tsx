import './App.css';

import { MantineProvider, MantineProviderProps } from '@mantine/core';
import { theme } from './config';

import Modals from './views/Modals';
import AppRouter from './AppRouter';
import useInitApp from './hooks/useInitApp';

const providerProps: MantineProviderProps = {
  children: <></>,
  classNames: {
    Button: { label: 'button_label' },
    TextInput: { label: 'input_label' },
    MultiSelect: { label: 'input_label' },
    Select: { label: 'input_label' },
    Textarea: { label: 'input_label' },
  },
  defaultProps: {
    // Button: { size: 'sm' },
    // TextInput: { size: 'sm' },
  },
  theme,
  withCSSVariables: true,
  withGlobalStyles: true,
  withNormalizeCSS: true,
};

function App() {
  useInitApp();

  return (
    <MantineProvider {...providerProps}>
      {/* // {fullPageLoading && <FullPageLoader />} */}

      <AppRouter />
      <Modals />
    </MantineProvider>
  );
}

export default App;

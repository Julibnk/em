import './App.css';

import { MantineProvider, MantineProviderProps } from '@mantine/core';
import { theme } from './config';

import Modals from './components/Modals';
import AppRouter from './AppRouter';
import useInitApp from './hooks/useInitApp';
import { createClient } from '@supabase/supabase-js';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const providerProps: MantineProviderProps = {
  children: <></>,
  // classNames: {
  //   Button: { label: 'button_label' },
  //   TextInput: { label: 'input_label' },
  //   MultiSelect: { label: 'input_label' },
  //   Select: { label: 'input_label' },
  //   Textarea: { label: 'input_label' },
  // },
  // defaultProps: {
  //   // Button: { size: 'sm' },
  //   // TextInput: { size: 'sm' },
  // },
  theme,
  withCSSVariables: true,
  withGlobalStyles: true,
  withNormalizeCSS: true,
};

function AppTempSupabase() {
  useInitApp();

  console.log(window.location.href);

  const url = new URL(window.location.href);
  // new URL(window.location.href);
  console.log(url.hash);
  console.log(url.hash.split('&')[0]);
  console.log(url.hash.split('&')[1]);
  // url.hash.split('&')[1]

  return (
    // <MantineProvider {...providerProps}>
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      socialLayout='horizontal'
      providers={['facebook']}
      // socialButtonSize='xlarge'
    />
    // </MantineProvider>
  );
}

export default AppTempSupabase;

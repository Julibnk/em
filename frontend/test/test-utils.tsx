//Creo que tiene que estar en la raiz para que vite no lo meta en el build

import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../src/config/store';
import { MantineProvider } from '../src/components/MantineProvider';
import React from 'react';

afterEach(() => {
  cleanup();
});

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReduxProvider store={store}>
      <MantineProvider>{children}</MantineProvider>
    </ReduxProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };

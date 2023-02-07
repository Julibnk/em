//Creo que tiene que estar en la raiz para que vite no lo meta en el build

import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';

import { MantineProvider } from '../src/components/Shared/Mantine/MantineProvider';
import React from 'react';

afterEach(() => {
  cleanup();
});

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <MantineProvider>{children}</MantineProvider>;
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

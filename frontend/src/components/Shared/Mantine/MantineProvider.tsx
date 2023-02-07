import { MantineProvider as Mantine } from '@mantine/core';
import { theme } from './theme-config';

type Props = {
  children: React.ReactNode;
};

export const MantineProvider = ({ children }: Props) => {
  return (
    <Mantine withCSSVariables withGlobalStyles withNormalizeCSS theme={theme}>
      {children}
    </Mantine>
  );
};

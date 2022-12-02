import {
  MantineProvider as Mantine,
  MantineProviderProps,
} from '@mantine/core';
import { theme } from '../config/theme';

type Props = {
  children?: React.ReactNode;
};

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

export const MantineProvider = ({ children }: Props) => {
  return <Mantine {...providerProps}>{children}</Mantine>;
};

import styles from './styles.module.css';
import {
  DefaultMantineColor,
  MantineThemeOverride,
  Tuple,
} from '@mantine/core';

export const theme: MantineThemeOverride = {
  black: '#05261F',
  primaryColor: 'turquoise',
  defaultRadius: 'md',
  fontFamily: 'Inter',

  components: {
    Tabs: {
      defaultProps: {
        variant: 'pills',
        color: 'turquoise.1',
      },
      classNames: {
        tabLabel: styles.tabLabel,
        panel: styles.tabPanel,
      },
    },
    InputWrapper: {
      classNames: {
        label: styles.inputLabel,
      },
    },
    Modal: {
      classNames: {
        root: styles.modalRoot,
        modal: styles.modalModal,
        header: styles.modalHeader,
        title: styles.modalTitle,
        body: styles.modalBody,
        close: styles.modalClose,
      },
      defaultProps: {
        centered: true,
        closeOnClickOutside: false,
      },
    },
    Table: {
      defaultProps: {
        highlightOnHover: true,
        verticalSpacing: 'xs',
        className: styles.table,
      },
    },
  },
  primaryShade: 6,
  colors: {
    turquoise: [
      '#E8F8F5',
      '#BAEBE1',
      '#8DDECE',
      '#76D7C4',
      '#48C9B0',
      '#1ABC9C',
      '#15967D',
      '#10715E',
      '#0A4B3E',
      '#05261F',
    ],
  },
};

// Extend Mantine theme colors
type ExtendedCustomColors = 'turquoise' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

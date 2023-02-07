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
    // silver: [
    //   '#F8F9F9',
    //   '#E5E7E9',
    //   '#DEE1E3',
    //   '#D1D5D8',
    //   '#CACFD2',
    //   '#BDC3C7',
    //   '#979C9F',
    //   '#84898B',
    //   '#4C4E50',
    //   '#262728',
    // ],
  },
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
  },
};

// Extend Mantine theme colors
type ExtendedCustomColors = 'turquoise' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

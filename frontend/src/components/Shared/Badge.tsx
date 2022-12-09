import { Badge as MantineBadge, MantineColor } from '@mantine/core';

interface Props {
  text: string;
  color?: MantineColor;
}

export const Badge = ({ text, color = 'turquoise' }: Props) => {
  return <MantineBadge color={color}>{text}</MantineBadge>;
};

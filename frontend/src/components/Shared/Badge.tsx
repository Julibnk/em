import { Badge as MantineBadge, MantineColor } from '@mantine/core';
// import
// import { useSelector } from '../../.<<./config/store';
// import { selectTemplateById } from '../../../Template/template-selector';

interface Props {
  text: string;
  color?: MantineColor;
}

export const Badge = ({ text, color = 'turquoise' }: Props) => {
  return <MantineBadge color={color}>{text}</MantineBadge>;
};

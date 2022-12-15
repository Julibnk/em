import { showNotification as mantineShowNotification } from '@mantine/notifications';

export interface Props {
  title: string;
  message: string;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'teal' | 'pink' | 'indigo';
}

export const showNotification = (props: Props) => {
  mantineShowNotification(props);
};

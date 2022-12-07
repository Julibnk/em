import { showNotification as mantineShowNotification } from '@mantine/notifications';

export interface Props {
  title: string;
  message: string;
}

export const showNotification = (props: Props) => {
  mantineShowNotification(props);
  //   console.log('showNotification');
};

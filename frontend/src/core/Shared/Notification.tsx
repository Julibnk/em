import { MantineColor } from '@mantine/core';
import { showNotification as mantineShowNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

export const showNotification = (
  title: string,
  message: string,
  type: NotificationType = NotificationType.ERROR
) => {
  const color: MantineColor =
    type === NotificationType.SUCCESS ? 'green' : 'red';
  const icon = type === NotificationType.SUCCESS ? <IconCheck /> : <IconX />;

  mantineShowNotification({ title, message, color, icon });
};

export const apiErrorNotification = (error: unknown) => {
  if (error instanceof Error) {
    return showNotification('Error', error.message);
  }

  showNotification(NotificationType.ERROR, 'An error occurred');
};

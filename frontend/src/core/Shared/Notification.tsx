import { MantineColor } from '@mantine/core';
import { showNotification as mantineShowNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export type NotificationType = 'SUCCESS' | 'ERROR' | 'WARNING';

export const showNotification = (
  title: string,
  message: string,
  type: NotificationType = 'ERROR'
) => {
  const color: MantineColor = type === 'SUCCESS' ? 'green' : 'red';
  const icon = type === 'SUCCESS' ? <IconCheck /> : <IconX />;

  mantineShowNotification({ title, message, color, icon });
};

export const apiErrorNotification = (error: unknown) => {
  if (error instanceof Error) {
    return showNotification('Error', error.message);
  }

  showNotification('ERROR', 'An error occurred');
};

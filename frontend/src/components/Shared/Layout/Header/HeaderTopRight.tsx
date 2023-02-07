import styles from './styles.module.css';

import { Avatar } from '@mantine/core';

export const HeaderTopRight = () => {
  return (
    <div>
      <Avatar className={styles.avatar} radius='xl'>
        RN
      </Avatar>
    </div>
  );
};

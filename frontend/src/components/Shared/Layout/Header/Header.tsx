import styles from './styles.module.css';

import { HeaderTitle } from './HeaderTitle';

export const Header = () => {
  return (
    <div className={styles.root}>
      <HeaderTitle />
    </div>
  );
};

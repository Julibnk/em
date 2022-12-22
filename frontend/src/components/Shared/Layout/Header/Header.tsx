import styles from './styles.module.css';

import { HeaderTitle } from './HeaderTitle';
import { HorizontalBar } from '../../HorizontalBar/HorizontalBar';

export const Header = () => {
  return (
    <div className={styles.root}>
      {/* <HeaderTop /> */}
      <HeaderTitle />
      <HorizontalBar />
    </div>
  );
};

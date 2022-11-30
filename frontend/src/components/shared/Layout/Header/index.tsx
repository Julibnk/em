import styles from './styles.module.css';

import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBar } from './HeaderBar/index';
import { HeaderTop } from './HeaderTop';

export const Header = () => {
  return (
    <div className={styles.root}>
      <HeaderTop />
      <div>
        <HeaderTitle />
        <HeaderSubtitle />
      </div>
      <HeaderBar />
    </div>
  );
};

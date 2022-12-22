import styles from './styles.module.css';

import { HeaderSecondaryTitle } from './HeaderSecondaryTitle';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBar } from './HeaderBar';
// import { HeaderTop } from './HeaderTop';

export const Header = () => {
  return (
    <div className={styles.root}>
      {/* <HeaderTop /> */}
      <div>
        <HeaderTitle />
        <HeaderSecondaryTitle />
      </div>
      <HeaderBar />
    </div>
  );
};

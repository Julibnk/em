import styles from './styles.module.css';

import { Breadcrum } from '../Breadcrum';
import { HeaderTopRight } from './HeaderTopRight';

export const HeaderTop = () => {
  return (
    <div className={styles.headerTop}>
      <Breadcrum />
      <HeaderTopRight />
    </div>
  );
};

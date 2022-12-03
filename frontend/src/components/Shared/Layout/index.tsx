import styles from './styles.module.css';
import { Navbar } from './Navbar/NavBar';
import { Main } from './Main';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Main />
    </div>
  );
};

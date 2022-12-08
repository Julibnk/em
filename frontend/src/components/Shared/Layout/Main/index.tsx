import styles from './styles.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';

export const Main = () => {
  return (
    <main>
      <div className={styles.main_container}>
        <Header />
        <div className={styles.sub_container}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
};

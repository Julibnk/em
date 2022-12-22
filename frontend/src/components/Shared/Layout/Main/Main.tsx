import styles from './styles.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';

export const Main = () => {
  return (
    <main>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.subContainer}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
};

import styles from './styles.module.css';
import { Title } from '@mantine/core';

import { routes } from '../../../../../config';

import { Routes, Route } from 'react-router-dom';

export const HeaderSubtitle = () => {
  return (
    <Routes>
      {routes.map(({ path, subtitle }, i) => {
        return (
          <Route
            key={i}
            path={path}
            element={
              <Title className={styles.title} order={4}>
                {subtitle}
              </Title>
            }
          />
        );
      })}
    </Routes>
  );
};

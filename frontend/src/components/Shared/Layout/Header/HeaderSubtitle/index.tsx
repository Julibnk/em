import styles from './styles.module.css';
import { Title } from '@mantine/core';

import { Routes, Route } from 'react-router-dom';

import { screenConfig } from '../../../../../AppRouter';
import { useTranslation } from '../../../../../Shared/hooks/useTranslation';

export const HeaderSubtitle = () => {
  const t = useTranslation();
  return (
    <Routes>
      {screenConfig.map(({ path, subtitle }, i) => {
        return (
          <Route
            key={i}
            path={path}
            element={
              <Title className={styles.title} order={4}>
                {t(subtitle)}
              </Title>
            }
          />
        );
      })}
    </Routes>
  );
};

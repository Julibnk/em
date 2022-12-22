import styles from './styles.module.css';
import { Title } from '@mantine/core';

import { Routes, Route } from 'react-router-dom';

import { screenConfig } from '../../../AppRouter';
import { useTranslation } from '../../../../core/Shared/hooks/useTranslation';

export const HeaderSecondaryTitle = () => {
  const t = useTranslation();
  return (
    <Routes>
      {screenConfig.map(({ path, subtitle }, i) => {
        return (
          <Route
            key={i}
            path={path}
            element={
              <Title className={styles.secondaryTitle} order={5}>
                {t(subtitle)}
              </Title>
            }
          />
        );
      })}
    </Routes>
  );
};

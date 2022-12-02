import styles from './styles.module.css';
import { Title } from '@mantine/core';

// import { routes } from '../../../../../config';

// export screenConfig

import { Routes, Route } from 'react-router-dom';
import { screenConfig } from '../../../../../AppRouter';
import { useTranslation } from '../../../../../Shared/hooks/useTranslation';

export const HeaderTitle = () => {
  const t = useTranslation();
  return (
    <Routes>
      {screenConfig.map(({ path, title }, i) => {
        return (
          <Route
            key={i}
            path={path}
            element={
              <Title className={styles.title} order={1}>
                {t(title, { plural: true })}
              </Title>
            }
          />
        );
      })}
    </Routes>
  );
};

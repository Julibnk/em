import { Title } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import { screenConfig } from '../../../AppRouter';
import { useTranslation } from '../../hooks/useTranslation';

export const HeaderTitle = () => {
  const t = useTranslation();
  return (
    <Routes>
      {screenConfig.map(({ path, title, subtitle }, i) => {
        return (
          <Route
            key={i}
            path={path}
            element={
              <div>
                <Title color='gray.9' order={2}>
                  {t(title, { plural: true })}
                </Title>
                <Title color='gray.6' weight={400} order={5}>
                  {t(subtitle, { plural: true })}
                </Title>
              </div>
            }
          />
        );
      })}
    </Routes>
  );
};

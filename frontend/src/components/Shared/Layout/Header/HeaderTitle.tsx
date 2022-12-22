import { Routes, Route } from 'react-router-dom';
import { screenConfig } from '../../../AppRouter';
import { useTranslation } from '../../../../core/Shared/hooks/useTranslation';
import { PrimaryTitle } from '../../Titles/PrimaryTitle';
import { SecondaryTitle } from '../../Titles/SecondaryTitle';

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
                <PrimaryTitle text={t(title, { plural: true })} order={2} />
                <SecondaryTitle
                  text={t(subtitle, { plural: true })}
                  order={5}
                />
              </div>
            }
          />
        );
      })}
    </Routes>
  );
};

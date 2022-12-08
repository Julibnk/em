import styles from './styles.module.css';

import { Title } from '@mantine/core';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { Link } from 'react-router-dom';

export const NotFoundContent = () => {
  const t = useTranslation();
  return (
    <div className={styles.root}>
      <Title>{t('not_found_title')}</Title>

      <div className={styles.image} />

      <Link to={'/'}>
        <Title order={3}>&#8656; {t('not_found_subtitle')}</Title>{' '}
      </Link>
    </div>
  );
};

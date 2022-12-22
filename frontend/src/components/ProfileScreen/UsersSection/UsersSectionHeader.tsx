import { Title } from '@mantine/core';
import styles from './styles.module.css';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';

export const UsersSectionHeader = () => {
  const t = useTranslation();
  return (
    <div className={styles.header}>
      <Title order={4}>{t('user', { plural: true })}</Title>
    </div>
  );
};

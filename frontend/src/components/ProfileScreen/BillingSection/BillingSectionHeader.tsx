import { Title } from '@mantine/core';
import styles from './styles.module.css';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';

export const BillingSectionHeader = () => {
  const t = useTranslation();
  return (
    <div className={styles.header}>
      <Title order={4}>{t('billing')}</Title>
    </div>
  );
};

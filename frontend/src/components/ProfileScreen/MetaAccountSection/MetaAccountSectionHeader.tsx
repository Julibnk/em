import { Button, Title } from '@mantine/core';
import styles from './styles.module.css';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { IconDeviceFloppy } from '@tabler/icons-react';

export const MetaAccountSectionHeader = () => {
  const t = useTranslation();
  return (
    <div className={styles.header}>
      <Title order={4}>{t('metaAccount')}</Title>
      <Button variant='filled' leftIcon={<IconDeviceFloppy />}>
        {t('save')}
      </Button>
    </div>
  );
};

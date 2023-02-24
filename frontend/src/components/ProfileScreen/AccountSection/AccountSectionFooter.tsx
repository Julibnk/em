import { Button } from '@mantine/core';
import styles from './styles.module.css';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { IconDeviceFloppy } from '@tabler/icons-react';

export const AccountSectionFooter = () => {
  const t = useTranslation();
  return (
    <div className={styles.footer}>
      <Button
        role={'submit'}
        form='account-form'
        type='submit'
        leftIcon={<IconDeviceFloppy />}
      >
        {t('save')}
      </Button>
    </div>
  );
};

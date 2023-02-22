import styles from './styles.module.css';
import { Button, TextInput } from '@mantine/core';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { useTranslation } from '../../Shared/hooks/useTranslation';

import { IconCloudUpload, IconSearch } from '@tabler/icons-react';

// export interface Props {
// handleAdd: () => void;
// handleLoad: () => void;
// }

export const ContactListHeader = () => {
  // const t = useTranslation();

  return (
    <header className={styles.root}>
      <div className={styles.left}>
        {/* <TextInput
          type='search'
          placeholder={t('search')}
          icon={<IconSearch />}
        />

        <SecondaryButton>{t('filter', { plural: true })}</SecondaryButton>
      </div>

      <div className={styles.right}>
        <SecondaryButton onClick={handleAdd}>
          {t('send_message')}
        </SecondaryButton>
        <Button
          onClick={handleLoad}
          variant='filled'
          leftIcon={<IconCloudUpload />}
        >
          {t('message_load')}
        </Button> */}
      </div>
    </header>
  );
};

import styles from './styles.module.css';
import { Button, TextInput } from '@mantine/core';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import {
  IconSend,
  IconCloudUpload,
  IconFilter,
  IconSearch,
} from '@tabler/icons-react';

export const MessageLoadHeader = () => {
  const t = useTranslation();
  const navigate = useNavigate();

  const handleOnCreateMessage = () => {
    // dispatch();
    // // setModalOpenend({ modal: 'message', opened: true, mode: 'create' })
  };
  const handleOnMessageLoad = () => {
    navigate('../load');
  };

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <TextInput
          type='search'
          placeholder={t('search')}
          icon={<IconSearch />}
        />
        <SecondaryButton leftIcon={IconFilter}>
          {t('filter', { plural: true })}
        </SecondaryButton>
      </div>

      <div className={styles.right}>
        <SecondaryButton onClick={handleOnCreateMessage} leftIcon={IconSend}>
          {t('create_message')}
        </SecondaryButton>
        <Button
          onClick={handleOnMessageLoad}
          variant='filled'
          leftIcon={<IconCloudUpload />}
        >
          {t('message_load')}
        </Button>
      </div>
    </div>
  );
};

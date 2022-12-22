import styles from './styles.module.css';
import { Button, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowUp,
  faFilter,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
// import { useTranslation } from 'react-i18next';
import { useDispatch } from '../../../config/store';
import { setModalOpenend } from '../../Shared/Layout/layout-slice';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';

export const MessageListHeader = () => {
  const t = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOnCreateMessage = () => {
    dispatch(
      setModalOpenend({ modal: 'message', opened: true, mode: 'create' })
    );
  };
  const handleOnMessageLoad = () => {
    navigate('load');
  };

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <TextInput
          type='search'
          placeholder={t('search')}
          icon={<FontAwesomeIcon icon={faSearch} />}
        />
        <SecondaryButton leftIcon={<FontAwesomeIcon icon={faFilter} />}>
          {t('filter', { plural: true })}
        </SecondaryButton>
      </div>

      <div className={styles.right}>
        <SecondaryButton
          onClick={handleOnCreateMessage}
          leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          {t('create_message')}
        </SecondaryButton>
        <Button
          onClick={handleOnMessageLoad}
          variant='filled'
          leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
        >
          {t('message_load')}
        </Button>
      </div>
    </div>
  );
};

import styles from './styles.module.css';
import { Button, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowUp,
  faFilter,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from '../../Shared/hooks/useTranslation';

export interface Props {
  handleAdd: () => void;
  handleLoad: () => void;
}

export const MessageListHeader = ({ handleAdd, handleLoad }: Props) => {
  const t = useTranslation();

  return (
    <header className={styles.root}>
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
          onClick={handleAdd}
          leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          {t('send_message')}
        </SecondaryButton>
        <Button
          onClick={handleLoad}
          variant='filled'
          leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
        >
          {t('message_load')}
        </Button>
      </div>
    </header>
  );
};

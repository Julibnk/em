import styles from './styles.module.css';
import { Button, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../Shared/hooks/useTranslation';

export interface Props {
  newTemplateHandler: () => void;
}

export const TemplateTableHeader = ({ newTemplateHandler }: Props) => {
  const t = useTranslation();

  return (
    <header className={styles.header}>
      <TextInput
        type='search'
        placeholder={t('search')}
        icon={<FontAwesomeIcon icon={faSearch} />}
      />

      <Button
        onClick={newTemplateHandler}
        variant='filled'
        leftIcon={<FontAwesomeIcon icon={faAdd} />}
      >
        {t('add')}
      </Button>
    </header>
  );
};

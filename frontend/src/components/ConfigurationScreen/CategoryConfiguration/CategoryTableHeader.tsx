import styles from './styles.module.css';

import { Button, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAdd } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';

export interface Props {
  handleAdd: () => void;
}

export const CategoryTableHeader = ({ handleAdd }: Props) => {
  const t = useTranslation();

  return (
    <header className={styles.header}>
      <TextInput
        type='search'
        placeholder={t('search')}
        icon={<FontAwesomeIcon icon={faSearch} />}
      />
      <Button
        onClick={handleAdd}
        variant='filled'
        leftIcon={<FontAwesomeIcon icon={faAdd} />}
      >
        {t('add')}
      </Button>
    </header>
  );
};

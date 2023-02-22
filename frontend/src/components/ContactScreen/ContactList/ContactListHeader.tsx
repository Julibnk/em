import styles from './styles.module.css';
import { Button, TextInput } from '@mantine/core';
import { useTranslation } from '../../Shared/hooks/useTranslation';

import { IconPlus, IconSearch } from '@tabler/icons-react';

export interface Props {
  handleAdd: () => void;
}

export const ContactListHeader = ({ handleAdd }: Props) => {
  const t = useTranslation();

  return (
    <header className={styles.root}>
      <div className={styles.left}>
        <TextInput
          type='search'
          placeholder={t('search')}
          icon={<IconSearch />}
        />
      </div>

      <div className={styles.right}>
        <Button onClick={handleAdd} variant='filled' leftIcon={<IconPlus />}>
          Crear
        </Button>
      </div>
    </header>
  );
};

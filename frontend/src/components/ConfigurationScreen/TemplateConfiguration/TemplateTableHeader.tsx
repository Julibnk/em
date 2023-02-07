import styles from './styles.module.css';
import { Button, TextInput } from '@mantine/core';
import { useTranslation } from '../../Shared/hooks/useTranslation';

import { IconSearch, IconPlus } from '@tabler/icons-react';

export interface Props {
  handleAdd: () => void;
}

export const TemplateTableHeader = ({ handleAdd }: Props) => {
  const t = useTranslation();

  return (
    <header className={styles.header}>
      <TextInput
        type='search'
        placeholder={t('search')}
        icon={<IconSearch />}
      />

      <Button onClick={handleAdd} variant='filled' leftIcon={<IconPlus />}>
        {t('add')}
      </Button>
    </header>
  );
};

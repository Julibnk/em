import styles from './styles.module.css';

import { Button, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAdd } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from '../../../config/store';
import { setModalOpenend } from '../../Shared/Layout/layout-slice';
import { setSelectedId } from '../../../Category/category-slice';
import { useTranslation } from '../../../Shared/hooks/useTranslation';

export const CategoryTableHeader = () => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const handleOnAdd = () => {
    dispatch(setSelectedId());
    dispatch(
      setModalOpenend({ modal: 'category', opened: true, mode: 'create' })
    );
  };

  return (
    <header className={styles.header}>
      <TextInput
        type='search'
        placeholder={t('search')}
        icon={<FontAwesomeIcon icon={faSearch} />}
      />
      <Button
        onClick={handleOnAdd}
        variant='filled'
        leftIcon={<FontAwesomeIcon icon={faAdd} />}
      >
        {t('add')}
      </Button>
    </header>
  );
};

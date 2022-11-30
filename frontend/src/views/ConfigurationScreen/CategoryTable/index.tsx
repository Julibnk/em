import styles from './styles.module.css';

// import { useTranslation } from 'react-i18next';

import CategoryTableRow from './row';
import { useEffect } from 'react';
import { Table, Th } from '../../../components/MantineOverwrite/Table';
import { init } from '../../../store/category-slice';
import { useDispatch, useSelector } from '../../../store/store';
import { selectAllCategories } from '../../../store/category-selector';
import { useTranslation } from '../../../hooks/useTranslation';

const CategoryTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const categories = useSelector((state) => selectAllCategories(state));

  const t = useTranslation();

  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <Th>{t('name')}</Th>
          <Th>{t('description')}</Th>
          <Th textAlign='center'>{t('template', { plural: true })}</Th>
          <Th textAlign='center'>{t('actions')}</Th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <CategoryTableRow
            key={category.id}
            category={category}
          ></CategoryTableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;

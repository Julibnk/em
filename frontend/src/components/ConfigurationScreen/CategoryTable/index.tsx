import styles from './styles.module.css';
import { CategoryTableRow } from './row';
import { useEffect } from 'react';
import { Table, Th } from '../../Shared/MantineOverwrite/Table';
import { init } from '../../../Category/category-slice';
import { useDispatch, useSelector } from '../../../store/store';
import { selectAllCategories } from '../../../Category/category-selector';
import { useTranslation } from '../../../Shared/hooks/useTranslation';

export const CategoryTable = () => {
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

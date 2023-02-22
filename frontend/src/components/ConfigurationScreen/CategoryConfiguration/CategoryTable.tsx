import styles from './styles.module.css';
import { CategoryTableRow } from './CategoryTableRow';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { Category } from '../../../core/Category/Category';
import { Table } from '@mantine/core';

export interface Props {
  categories: Category[];
  handleEdit: (templateId: string) => void;
  handleDelete: (templateId: string) => void;
}

export const CategoryTable = ({
  categories,
  handleDelete,
  handleEdit,
}: Props) => {
  const t = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th>{t('description')}</th>
          <th className={styles.textCenter}>
            {t('template', { plural: true })}
          </th>
          <th className={styles.textCenter}>{t('actions')}</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {categories.map((category) => (
          <CategoryTableRow
            key={category.id}
            category={category}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></CategoryTableRow>
        ))}
      </tbody>
    </Table>
  );
};

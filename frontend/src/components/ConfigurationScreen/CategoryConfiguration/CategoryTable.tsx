import styles from './styles.module.css';
import { CategoryTableRow } from './CategoryTableRow';
import { Table, Th } from '../../Shared/Table';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { Category } from '../../../core/Category/Category';

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
    <Table className={`${styles.table}`}>
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
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></CategoryTableRow>
        ))}
      </tbody>
    </Table>
  );
};

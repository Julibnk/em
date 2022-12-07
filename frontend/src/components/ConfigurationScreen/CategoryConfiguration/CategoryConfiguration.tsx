import { useEffect } from 'react';
import { CategoryRepository } from '../../../core/Category/CategoryRepository';
import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { CategoryModal } from './CategoryModal/CategoryModal';
import { CategoryTable } from './CategoryTable';
import { CategoryTableHeader } from './CategoryTableHeader';
import { useCategoryModal } from './useCategoryModal';
import { useCategoryTable } from './useCategoryTable';
import { TemplateRepository } from '../../../core/Template/TemplateRepository';

export interface Props {
  repository: CategoryRepository;
  templateRepository: TemplateRepository;
}

export const CategoryConfiguration = ({
  repository,
  templateRepository,
}: Props) => {
  const { categories, loadCategories } = useCategoryTable(repository);
  const { categoryModalState, add, close, submit, edit } = useCategoryModal(
    repository,
    templateRepository
  );

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <ScreenContent>
      <CategoryTableHeader handleAdd={add} />
      <CategoryTable
        categories={categories}
        handleEdit={edit}
        handleDelete={(id) => {
          console.log(id);
        }}
      />
      <CategoryModal
        handleClose={close}
        state={categoryModalState}
        handleSubmit={submit}
      />
    </ScreenContent>
  );
};

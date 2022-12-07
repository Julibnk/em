import { useEffect, useCallback } from 'react';
import { CategoryRepository } from '../../../core/Category/CategoryRepository';
import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { CategoryModal } from './CategoryModal/CategoryModal';
import { CategoryTable } from './CategoryTable';
import { CategoryTableHeader } from './CategoryTableHeader';
import { useCategoryModal } from './useCategoryModal';
import { useCategoryTable } from './useCategoryTable';
import { TemplateRepository } from '../../../core/Template/TemplateRepository';
import { LoadingOverlay } from '../../Shared/Loading';

export interface Props {
  repository: CategoryRepository;
  templateRepository: TemplateRepository;
}

export const CategoryConfiguration = ({
  repository,
  templateRepository,
}: Props) => {
  const { categories, loadCategories, loading } = useCategoryTable(repository);

  const onSubmitSuccess = useCallback(() => {
    loadCategories();
  }, []);

  const { categoryModalState, add, close, submit, edit } = useCategoryModal(
    repository,
    templateRepository,
    onSubmitSuccess
  );

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <ScreenContent>
      <LoadingOverlay loading={loading} />
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

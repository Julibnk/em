import { useEffect, useCallback } from 'react';
import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { CategoryModal } from './CategoryModal/CategoryModal';
import { CategoryTable } from './CategoryTable';
import { CategoryTableHeader } from './CategoryTableHeader';
import { useCategoryModal } from './CategoryModal/useCategoryModal';
import { useCategoryTable } from './useCategoryTable';
import { LoadingOverlay } from '../../Shared/Loading';

export const CategoryConfiguration = () => {
  const { categories, loadCategories, loading } = useCategoryTable();

  const onSubmitSuccess = useCallback(() => {
    loadCategories();
  }, []);

  const { categoryModalState, add, close, submit, edit } =
    useCategoryModal(onSubmitSuccess);

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

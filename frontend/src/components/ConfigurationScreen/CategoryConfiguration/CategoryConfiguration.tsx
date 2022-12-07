import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { CategoryModal } from './CategoryModal';
import { CategoryTable } from './CategoryTable';
import { CategoryTableHeader } from './CategoryTableHeader';

export const CategoryConfiguration = () => {
  return (
    <ScreenContent>
      <CategoryTableHeader />
      <CategoryTable />
      <CategoryModal />
    </ScreenContent>
  );
};

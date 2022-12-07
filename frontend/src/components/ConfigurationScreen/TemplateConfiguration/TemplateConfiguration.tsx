import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { TemplateModal } from './TemplateModal';
import { TemplateTable } from './TemplateTable';
import { TemplateTableHeader } from './TemplateTableHeader';

export const TemplateConfiguration = () => {
  return (
    <ScreenContent>
      <TemplateTableHeader />
      <TemplateTable />
      <TemplateModal />
    </ScreenContent>
  );
};

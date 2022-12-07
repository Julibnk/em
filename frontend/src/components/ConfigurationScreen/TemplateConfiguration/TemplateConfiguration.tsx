import { RestTemplateRepository } from '../../../Template/RestTemplateRepository';
import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { TemplateTable } from './TemplateTable';
import { TemplateTableHeader } from './TemplateTableHeader';
import { useTemplateTable } from './useTemplateTable';
import { useEffect } from 'react';
import { useTemplateModal } from './useTemplateModal';

export interface TemplateConfigurationProps {
  repository: RestTemplateRepository;
}

export const TemplateConfiguration = ({
  repository,
}: TemplateConfigurationProps) => {
  const { templates, loadTemplates } = useTemplateTable(repository);
  const { templateModalState, newTemplate, close, submit, edit } =
    useTemplateModal(repository);

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <ScreenContent>
      <TemplateTableHeader newTemplateHandler={newTemplate} />
      <TemplateTable
        templates={templates}
        handleEdit={edit}
        handleDelete={(id) => {
          console.log(id);
        }}
      />
      <TemplateModal
        handleClose={close}
        state={templateModalState}
        handleSubmit={submit}
      />
    </ScreenContent>
  );
};

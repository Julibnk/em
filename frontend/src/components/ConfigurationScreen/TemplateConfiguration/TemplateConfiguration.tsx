import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { TemplateTable } from './TemplateTable';
import { TemplateTableHeader } from './TemplateTableHeader';
import { useTemplateTable } from './useTemplateTable';
import { useEffect, useCallback } from 'react';
import { useTemplateModal } from './TemplateModal/useTemplateModal';
import { TemplateRepository } from '../../../core/Template/TemplateRepository';

export interface Props {
  repository: TemplateRepository;
}

export const TemplateConfiguration = ({ repository }: Props) => {
  const { templates, loadTemplates } = useTemplateTable(repository);

  const onSubmitSuccess = useCallback(() => {
    loadTemplates();
  }, []);

  const { templateModalState, add, close, submit, edit } = useTemplateModal(
    repository,
    onSubmitSuccess
  );

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <ScreenContent>
      <TemplateTableHeader handleAdd={add} />
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

import { ScreenContent } from '../../Shared/Layout/ScreenContent';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { TemplateTable } from './TemplateTable';
import { TemplateTableHeader } from './TemplateTableHeader';
import { useTemplateTable } from './useTemplateTable';
import { useEffect, useCallback } from 'react';
import { useTemplateModal } from './TemplateModal/useTemplateModal';

export const TemplateConfiguration = () => {
  const { templates, loadTemplates } = useTemplateTable();

  const onSubmitSuccess = useCallback(() => {
    loadTemplates();
  }, []);

  const { templateModalState, add, close, submit, edit } =
    useTemplateModal(onSubmitSuccess);

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <ScreenContent>
      <h1>ASD</h1>
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

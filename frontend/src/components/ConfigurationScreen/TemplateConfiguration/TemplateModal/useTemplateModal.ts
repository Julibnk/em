import { useCallback, useReducer } from 'react';
import { Uuid } from '../../../../core/Shared/Uuid';
import { TemplateRepository } from '../../../../core/Template/TemplateRepository';
import {
  initialState,
  TemplateModalActionTypes,
  templateModalReducer,
} from './templateModalReducer';

export function useTemplateModal(repository: TemplateRepository) {
  const [templateModalState, dispatch] = useReducer(
    templateModalReducer,
    initialState
  );

  const add = useCallback(() => {
    const payload = { id: Uuid.create(), name: '' };

    dispatch({
      type: TemplateModalActionTypes.CREATE,
      payload,
    });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: TemplateModalActionTypes.CLOSE });
  }, []);

  const edit = useCallback(async (templateId: string) => {
    const template = await repository.searchById(templateId);

    if (template)
      dispatch({ type: TemplateModalActionTypes.EDIT, payload: template });
  }, []);

  const submit = useCallback(() => {
    dispatch({ type: TemplateModalActionTypes.LOADING });
  }, []);

  return {
    templateModalState,
    add,
    close,
    submit,
    edit,
  };
}

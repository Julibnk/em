import { useCallback, useReducer } from 'react';
import { Nullable } from '../../../Shared/Nullable';
import { Uuid } from '../../../Shared/Uuid';
import { Template, TemplateRepository } from '../../../Template/Template';
import { ModalMode } from '../../Shared/Modal/Modal';

export interface TemplateModalState {
  template: Nullable<Template>;
  loading: boolean;
  opened: boolean;
  mode: Nullable<ModalMode>;
}

const initialState: TemplateModalState = {
  template: null,
  loading: false,
  opened: false,
  mode: null,
};

type TemplateModalAction =
  | {
      type: TemplateModalActionTypes.CLOSE | TemplateModalActionTypes.LOADING;
    }
  | {
      type: TemplateModalActionTypes.CREATE | TemplateModalActionTypes.EDIT;
      payload: Template;
    };

enum TemplateModalActionTypes {
  CREATE = 'CREATE',
  CLOSE = 'CLOSE',
  EDIT = 'EDIT',
  LOADING = 'LOADING',
}

const templateModalReducer = (
  state: TemplateModalState,
  action: TemplateModalAction
): TemplateModalState => {
  switch (action.type) {
    case TemplateModalActionTypes.CREATE:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.CREATE,
        template: action.payload,
      };

    case TemplateModalActionTypes.EDIT:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.EDIT,
        template: action.payload,
      };

    case TemplateModalActionTypes.CLOSE:
      return initialState;

    case TemplateModalActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
  }
};

export function useTemplateModal(repository: TemplateRepository) {
  const [templateModalState, dispatch] = useReducer(
    templateModalReducer,
    initialState
  );

  const newTemplate = useCallback(() => {
    dispatch({
      type: TemplateModalActionTypes.CREATE,
      payload: { id: Uuid.create(), name: '' },
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
    newTemplate,
    close,
    submit,
    edit,
  };
}

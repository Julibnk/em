import { Nullable } from '../../../../core/Shared/Nullable';
import { Template } from '../../../../core/Template/Template';
import { ModalMode } from '../../../Shared/ModalTitle';

export enum TemplateModalActionTypes {
  CREATE = 'CREATE',
  CLOSE = 'CLOSE',
  EDIT = 'EDIT',
  LOADING = 'LOADING',
}

export interface TemplateModalState {
  template: Nullable<Template>;
  loading: boolean;
  opened: boolean;
  mode: Nullable<ModalMode>;
}

export const initialState: TemplateModalState = {
  template: null,
  loading: false,
  opened: false,
  mode: null,
};

export type TemplateModalAction =
  | {
      type: TemplateModalActionTypes.CLOSE;
    }
  | { type: TemplateModalActionTypes.LOADING; payload: boolean }
  | {
      type: TemplateModalActionTypes.CREATE | TemplateModalActionTypes.EDIT;
      payload: Template;
    };

export const templateModalReducer = (
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
        loading: action.payload,
      };
  }
};

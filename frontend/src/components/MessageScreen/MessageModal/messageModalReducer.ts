import { Nullable } from '../../../core/Shared/Nullable';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { ModalMode } from '../../Shared/Modal/Modal';

export enum MessageModalActionTypes {
  CREATE = 'CREATE',
  CLOSE = 'CLOSE',
  EDIT = 'EDIT',
  LOADING = 'LOADING',
}

export interface MessageModalState {
  message: Nullable<TemplateMessage>;
  loading: boolean;
  opened: boolean;
  mode: Nullable<ModalMode>;
}

export const initialState: MessageModalState = {
  message: null,
  loading: false,
  opened: false,
  mode: null,
};

export type MessageModalAction =
  | {
      type: MessageModalActionTypes.CLOSE;
    }
  | { type: MessageModalActionTypes.LOADING; payload: boolean }
  | {
      type: MessageModalActionTypes.CREATE | MessageModalActionTypes.EDIT;
      payload: TemplateMessage;
    };

export const messageModalReducer = (
  state: MessageModalState,
  action: MessageModalAction
): MessageModalState => {
  switch (action.type) {
    case MessageModalActionTypes.CREATE:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.CREATE,
        message: action.payload,
      };

    case MessageModalActionTypes.EDIT:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.EDIT,
        message: action.payload,
      };

    case MessageModalActionTypes.CLOSE:
      return initialState;

    case MessageModalActionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
  }
};

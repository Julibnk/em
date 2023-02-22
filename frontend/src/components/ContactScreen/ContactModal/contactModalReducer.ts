import { Contact } from '../../../core/Contact/Contact';
import { Nullable } from '../../../core/Shared/Nullable';
import { ModalMode } from '../../Shared/ModalTitle';

export enum ContactModalActionTypes {
  CREATE = 'CREATE',
  CLOSE = 'CLOSE',
  EDIT = 'EDIT',
  LOADING = 'LOADING',
}

export interface ContactModalState {
  contact: Nullable<Contact>;
  loading: boolean;
  opened: boolean;
  mode: Nullable<ModalMode>;
}

export const initialState: ContactModalState = {
  contact: null,
  loading: false,
  opened: false,
  mode: null,
};

export type ContactModalAction =
  | {
      type: ContactModalActionTypes.CLOSE;
    }
  | { type: ContactModalActionTypes.LOADING; payload: boolean }
  | {
      type: ContactModalActionTypes.CREATE | ContactModalActionTypes.EDIT;
      payload: Contact;
    };

export const contactModalReducer = (
  state: ContactModalState,
  action: ContactModalAction
): ContactModalState => {
  switch (action.type) {
    case ContactModalActionTypes.CREATE:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.CREATE,
        contact: action.payload,
      };

    case ContactModalActionTypes.EDIT:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.EDIT,
        contact: action.payload,
      };

    case ContactModalActionTypes.CLOSE:
      return initialState;

    case ContactModalActionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
  }
};

import { Category } from '../../../../core/Category/Category';
import { Nullable } from '../../../../core/Shared/Nullable';
import { Template } from '../../../../core/Template/Template';
import { ModalMode } from '../../../Shared/ModalTitle';

export enum CategoryModalActionTypes {
  CREATE = 'CREATE',
  CLOSE = 'CLOSE',
  EDIT = 'EDIT',
  LOADING = 'LOADING',
}

export interface CategoryModalState {
  category: Nullable<Category>;
  allTemplates: Template[];
  loading: boolean;
  opened: boolean;
  mode: Nullable<ModalMode>;
}

export const initialState: CategoryModalState = {
  category: null,
  allTemplates: [],
  loading: false,
  opened: false,
  mode: null,
};

type CategoryModalAction =
  | {
      type: CategoryModalActionTypes.CLOSE;
    }
  | { type: CategoryModalActionTypes.LOADING; payload: boolean }
  | {
      type: CategoryModalActionTypes.CREATE | CategoryModalActionTypes.EDIT;
      payload: { category: Category; allTemplates: Template[] };
    };

export const categoryModalReducer = (
  state: CategoryModalState,
  action: CategoryModalAction
): CategoryModalState => {
  switch (action.type) {
    case CategoryModalActionTypes.CREATE:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.CREATE,
        category: action.payload.category,
        allTemplates: action.payload.allTemplates,
      };

    case CategoryModalActionTypes.EDIT:
      return {
        ...initialState,
        opened: true,
        mode: ModalMode.EDIT,
        category: action.payload.category,
        allTemplates: action.payload.allTemplates,
      };

    case CategoryModalActionTypes.CLOSE:
      return initialState;

    case CategoryModalActionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
  }
};

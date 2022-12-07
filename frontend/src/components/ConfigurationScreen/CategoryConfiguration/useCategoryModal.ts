import { useCallback, useReducer } from 'react';

import { Category } from '../../../Category/Category';
import { Nullable } from '../../../Shared/Nullable';
import { ModalMode } from '../../Shared/Modal/Modal';
import { CategoryRepository } from '../../../Category/CategoryRepository';
import { Uuid } from '../../../Shared/Uuid';
import { Template } from '../../../Template/Template';
import { TemplateRepository } from '../../../Template/TemplateRepository';

enum CategoryModalActionTypes {
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

const initialState: CategoryModalState = {
  category: null,
  allTemplates: [],
  loading: false,
  opened: false,
  mode: null,
};

type CategoryModalAction =
  | {
      type: CategoryModalActionTypes.CLOSE | CategoryModalActionTypes.LOADING;
    }
  | {
      type: CategoryModalActionTypes.CREATE | CategoryModalActionTypes.EDIT;
      payload: { category: Category; allTemplates: Template[] };
    };

const categoryModalReducer = (
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
        loading: true,
      };
  }
};

export function useCategoryModal(
  repository: CategoryRepository,
  templateRepository: TemplateRepository
) {
  const [categoryModalState, dispatch] = useReducer(
    categoryModalReducer,
    initialState
  );

  const add = useCallback(async () => {
    const allTemplates = await templateRepository.searchAll();

    dispatch({
      type: CategoryModalActionTypes.CREATE,
      payload: {
        category: {
          id: Uuid.create(),
          name: '',
          description: '',
          templates: [],
        },
        allTemplates,
      },
    });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: CategoryModalActionTypes.CLOSE });
  }, []);

  const edit = useCallback((categoryId: string) => {
    Promise.all([
      repository.searchById(categoryId),
      templateRepository.searchAll(),
    ]).then(([category, allTemplates]) => {
      if (category)
        dispatch({
          type: CategoryModalActionTypes.EDIT,
          payload: { category, allTemplates },
        });
    });
  }, []);

  const submit = useCallback(() => {
    dispatch({ type: CategoryModalActionTypes.LOADING });
  }, []);

  return {
    categoryModalState,
    add,
    close,
    submit,
    edit,
  };
}

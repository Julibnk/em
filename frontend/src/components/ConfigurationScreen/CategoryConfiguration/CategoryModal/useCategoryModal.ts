import { useCallback, useReducer } from 'react';

import { Category, CategoryOnlyIds } from '../../../../core/Category/Category';
import { Nullable } from '../../../../core/Shared/Nullable';
import { ModalMode } from '../../../Shared/Modal/Modal';
import { CategoryRepository } from '../../../../core/Category/CategoryRepository';
import { Uuid } from '../../../../core/Shared/Uuid';
import { Template } from '../../../../core/Template/Template';
import { TemplateRepository } from '../../../../core/Template/TemplateRepository';
import { showNotification } from '../../../../core/Shared/Notification';

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
      type: CategoryModalActionTypes.CLOSE;
    }
  | { type: CategoryModalActionTypes.LOADING; payload: boolean }
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
        loading: action.payload,
      };
  }
};

export function useCategoryModal(
  repository: CategoryRepository,
  templateRepository: TemplateRepository,
  onSubmitSuccess: () => void
) {
  const [categoryModalState, dispatch] = useReducer(
    categoryModalReducer,
    initialState
  );

  const add = useCallback(async () => {
    const allTemplates = await templateRepository.searchAll();

    const payload = {
      category: {
        id: Uuid.create(),
        name: '',
        description: '',
        templates: [],
      },
      allTemplates,
    };

    dispatch({
      type: CategoryModalActionTypes.CREATE,
      payload,
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

  const submit = useCallback(async (category: CategoryOnlyIds) => {
    try {
      dispatch({ type: CategoryModalActionTypes.LOADING, payload: true });
      await repository.save(category);
      dispatch({ type: CategoryModalActionTypes.CLOSE });
      onSubmitSuccess();
    } catch (error) {
      showNotification({ title: 'Error', message: 'error' });
      dispatch({ type: CategoryModalActionTypes.LOADING, payload: false });
    }
  }, []);

  return {
    categoryModalState,
    add,
    close,
    submit,
    edit,
  };
}

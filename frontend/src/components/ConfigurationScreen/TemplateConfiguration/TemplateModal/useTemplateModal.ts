import { useCallback, useReducer } from 'react';
import {
  showNotification,
  apiErrorNotification,
} from '../../../../core/Shared/Notification';
import { Uuid } from '../../../../core/Shared/Uuid';
import { Template } from '../../../../core/Template/Template';
import { useConfigurationScreenContext } from '../../ConfigurationScreenProvider';
import { useTranslation } from '../../../Shared/hooks/useTranslation';
import {
  initialState,
  TemplateModalActionTypes,
  templateModalReducer,
} from './templateModalReducer';

export function useTemplateModal(onSubmitSuccess: () => void) {
  const t = useTranslation();

  const { templateRepository } = useConfigurationScreenContext();

  const [templateModalState, dispatch] = useReducer(
    templateModalReducer,
    initialState
  );

  const add = useCallback(() => {
    const payload = {
      id: Uuid.create(),
      name: '',
      description: '',
      preview: '',
      variable1: '',
      variable2: '',
      variable3: '',
    };

    dispatch({
      type: TemplateModalActionTypes.CREATE,
      payload,
    });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: TemplateModalActionTypes.CLOSE });
  }, []);

  const edit = useCallback(async (templateId: string) => {
    const template = await templateRepository.searchById(templateId);

    if (template)
      dispatch({ type: TemplateModalActionTypes.EDIT, payload: template });
  }, []);

  const submit = useCallback(async (template: Template) => {
    try {
      dispatch({ type: TemplateModalActionTypes.LOADING, payload: true });
      await templateRepository.save(template);
      dispatch({ type: TemplateModalActionTypes.CLOSE });
      onSubmitSuccess();
    } catch (error) {
      apiErrorNotification(error);
      dispatch({ type: TemplateModalActionTypes.LOADING, payload: false });
    }
  }, []);

  return {
    templateModalState,
    add,
    close,
    submit,
    edit,
  };
}

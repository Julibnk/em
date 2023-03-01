import { useCallback, useReducer } from 'react';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { Uuid } from '../../../core/Shared/Uuid';
import { useMessageScreenContext } from '../MessageScreenContext';
import {
  initialState,
  messageModalReducer,
  MessageModalActionTypes,
} from './messageModalReducer';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { apiErrorNotification } from '../../../core/Shared/Notification';

export function useMessageModal(onSubmitSuccess: () => void) {
  const t = useTranslation();

  const { templateMessageRepository: messageRepository } =
    useMessageScreenContext();

  const [messageModalState, dispatch] = useReducer(
    messageModalReducer,
    initialState
  );

  const add = useCallback(() => {
    const payload: TemplateMessage = {
      id: Uuid.create(),
      status: null,
      templateId: '',
      accountPhoneId: '',
      contact: {
        id: '',
        name: '',
        lastName: '',
        phone: {
          prefix: '+34',
          number: '',
        },
      },
      parameter1: '',
      parameter2: '',
      parameter3: '',
      isScheduled: false,
      scheduleDate: null,
      sentDate: null,
    };

    dispatch({
      type: MessageModalActionTypes.CREATE,
      payload,
    });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: MessageModalActionTypes.CLOSE });
  }, []);

  const edit = useCallback(async (messageId: string) => {
    const message = await messageRepository.searchById(messageId);

    if (message)
      dispatch({ type: MessageModalActionTypes.EDIT, payload: message });
  }, []);

  const submit = useCallback(async (message: TemplateMessage) => {
    try {
      dispatch({ type: MessageModalActionTypes.LOADING, payload: true });
      await messageRepository.save(message);
      dispatch({ type: MessageModalActionTypes.CLOSE });
      onSubmitSuccess();
    } catch (error) {
      apiErrorNotification(error);
    }
  }, []);

  return {
    messageModalState,
    add,
    close,
    submit,
    edit,
  };
}

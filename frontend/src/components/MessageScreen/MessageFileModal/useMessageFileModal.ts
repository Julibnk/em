import { useCallback, useReducer } from 'react';
import {
  initialState,
  messageFileModalReducer,
  MessageFileModalActions,
} from './messageFileModalReducer';
import { useNavigate } from 'react-router-dom';

export function useMessageFileModal() {
  const navigate = useNavigate();

  const [messageFileModalState, dispatch] = useReducer(
    messageFileModalReducer,
    initialState
  );

  const open = useCallback(() => {
    dispatch({
      type: MessageFileModalActions.OPEN,
    });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: MessageFileModalActions.CLOSE });
  }, []);

  const confirm = useCallback(async () => {
    navigate('load');
  }, []);

  return {
    messageFileModalState,
    confirm,
    close,
    open,
  };
}

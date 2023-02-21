import { ScreenContent } from '../Shared/Layout/ScreenContent';
import { MessageTable } from './MessageList/MessageTable';
import { MessageListHeader } from './MessageList/MessageListHeader';
import { RestTemplateMessageRepository } from '../../core/TemplateMessage/RestTemplateMessageRepository';
import { MessageScreenProvider } from './MessageScreenContext';

import { useMessageTable } from './MessageList/useMessageTable';
import { useCallback, useEffect } from 'react';
import { useMessageModal } from './MessageModal/useMessageModal';
import { MessageFileModal } from './MessageFileModal/MessageFileModal';
import { MessageModal } from './MessageModal/MessageModal';
import { useMessageFileModal } from './MessageFileModal/useMessageFileModal';

const MessageScreen = () => {
  const { messages, loadMessages } = useMessageTable();

  const onSubmitSuccess = useCallback(() => {
    loadMessages();
  }, []);

  const {
    messageModalState,
    add,
    close: closeMessageModal,
    submit,
    edit,
  } = useMessageModal(onSubmitSuccess);

  const {
    messageFileModalState,
    // confirm,
    close: closeLoadModal,
    open: openLoadModal,
  } = useMessageFileModal();

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <ScreenContent>
      <MessageListHeader handleAdd={add} handleLoad={openLoadModal} />
      <MessageTable messages={messages} handleEdit={edit} />
      <MessageModal
        state={messageModalState}
        handleClose={closeMessageModal}
        handleSubmit={submit}
      />
      <MessageFileModal
        state={messageFileModalState}
        handleClose={closeLoadModal}
      />
    </ScreenContent>
  );
};

const templateMessageRepository = RestTemplateMessageRepository.create();

const MessageScreenWrapper = () => {
  return (
    <MessageScreenProvider
      templateMessageRepository={templateMessageRepository}
    >
      <MessageScreen />
    </MessageScreenProvider>
  );
};

export default MessageScreenWrapper;

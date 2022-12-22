import { ScreenContent } from '../Shared/Layout/ScreenContent';
import { MessageTable } from './MessageList/MessageTable';
import { MessageListHeader } from './MessageList/MessageListHeader';
import { RestTemplateMessageRepository } from '../../core/TemplateMessage/RestTemplateRepository';
import { MessageScreenProvider } from './MessageScreenContext';

import { FetchRestClient } from '../../core/RestClient/FetchRestClient';

const client = new FetchRestClient();

const templateMessageRepository = new RestTemplateMessageRepository(client);

const MessageScreen = () => {
  return (
    <MessageScreenProvider
      templateMessageRepository={templateMessageRepository}
    >
      <ScreenContent>
        <MessageListHeader />
        <MessageTable />
      </ScreenContent>
    </MessageScreenProvider>
  );
};

export default MessageScreen;

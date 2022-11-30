import { ScreenContent } from '../../components/shared/Layout/ScreenContent';
import { MessageListTable } from './MessageListTable';
import { MessageListHeader } from './MessageListHeader';

export const MessageListScreen = () => {
  return (
    <ScreenContent>
      <MessageListHeader />
      <MessageListTable />
    </ScreenContent>
  );
};

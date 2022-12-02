import { Table, Th } from '../../Shared/MantineOverwrite/Table';
import { useSelector } from '../../../store/store';
import { MessageTableRow } from './row';
import { selectAllMessages } from '../../../Message/message-selector';
import { useTranslation } from '../../../Shared/hooks/useTranslation';

export const MessageListTable = () => {
  const messages = useSelector((state) => selectAllMessages(state));
  const t = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <Th>{t('name')}</Th>
          <Th>{t('preview')}</Th>
          <Th textAlign='center'>{t('variable', { plural: true })}</Th>
          <Th textAlign='center'>{t('category', { plural: true })}</Th>
          <Th textAlign='center'>{t('actions')}</Th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => (
          <MessageTableRow key={message.id} message={message} />
        ))}
      </tbody>
    </Table>
  );
};

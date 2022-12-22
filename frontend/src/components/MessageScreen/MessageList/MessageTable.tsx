import { Table, Th } from '../../Shared/Table';
import { MessageTableRow } from './MessageTableRow';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { useMessageTable } from './useMessageTable';

export const MessageTable = () => {
  const t = useTranslation();
  const { messages } = useMessageTable();

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

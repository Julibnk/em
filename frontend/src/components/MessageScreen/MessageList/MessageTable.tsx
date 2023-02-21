import { MessageTableRow } from './MessageTableRow';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { Table } from '@mantine/core';

export interface Props {
  messages: TemplateMessage[];
  handleEdit: (messageId: string) => void;
}

export const MessageTable = ({ messages }: Props) => {
  const t = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <th>Estado</th>
          <th>Fecha y hora de envío</th>
          <th>Contacto</th>
          <th>Teléfono</th>
          <th>Plantilla</th>
          <th>Categoría</th>
          <th>{t('actions')}</th>
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

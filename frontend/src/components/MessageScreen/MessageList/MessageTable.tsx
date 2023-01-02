import { Table, Th } from '../../Shared/Table';
import { MessageTableRow } from './MessageTableRow';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';

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
          <Th textAlign='center'>Estado</Th>
          <Th>Fecha y hora de envío</Th>
          <Th>Contacto</Th>
          <Th>Teléfono</Th>
          <Th>Plantilla</Th>
          <Th>Categoría</Th>
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

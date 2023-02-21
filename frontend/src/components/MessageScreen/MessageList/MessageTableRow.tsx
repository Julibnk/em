import { Td } from '../../Shared/Table';

import { ActionIcon } from '@mantine/core';
import { ActionCell, BadgeCell } from '../../Shared/TableCells';
import { TemplateMessage as Message } from '../../../core/TemplateMessage/TemplateMessage';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import { Badge } from '../../Shared/Badge';

type Props = {
  message: Message;
};

export const MessageTableRow = ({ message }: Props) => {
  const {
    id,
    status,
    templateId,
    accountPhoneId,
    contactId,
    parameter1,
    parameter2,
    parameter3,
    scheduleDate,
    sentDate,
  } = message;

  // const dispatch = useDispatch();

  const handleOnEdit = (id: string) => {
    //
  };
  const handleOnDelete = (id: string) => {
    //
  };

  // <Th>Fecha y hora de envío</Th>
  // <Th>Contacto</Th>
  // <Th>Teléfono</Th>
  // <Th>Plantilla</Th>
  // <Th>Categoría</Th>
  // <Th>Plantilla</Th>

  return (
    <tr key={id}>
      <Td>
        <BadgeCell>
          {status && <Badge color='violet' text={status} />}
        </BadgeCell>
      </Td>
      <Td>{sentDate && sentDate.toString()}</Td>
      <Td>{contactId}</Td>
      <Td>{contactId}</Td>
      <Td>{templateId}</Td>
      <Td></Td>
      <Td></Td>

      <Td>
        <ActionCell>
          <ActionIcon onClick={() => handleOnEdit(id)}>
            <IconPencil />
          </ActionIcon>
          <ActionIcon onClick={() => handleOnDelete(id)}>
            <IconTrash />
          </ActionIcon>
        </ActionCell>
      </Td>
    </tr>
  );
};
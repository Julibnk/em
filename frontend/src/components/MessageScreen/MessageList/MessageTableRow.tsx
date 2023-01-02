import { Td } from '../../Shared/Table';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon } from '@mantine/core';
import { ActionCell, BadgeCell } from '../../Shared/TableCells';
import { TemplateMessage as Message } from '../../../core/TemplateMessage/TemplateMessage';
import { EntityId } from '@reduxjs/toolkit';
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

  const handleOnEdit = (id: EntityId) => {
    //
  };
  const handleOnDelete = (id: EntityId) => {
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
            <FontAwesomeIcon size='lg' icon={faPen}></FontAwesomeIcon>
          </ActionIcon>
          <ActionIcon onClick={() => handleOnDelete(id)}>
            <FontAwesomeIcon size='lg' icon={faTrashAlt}></FontAwesomeIcon>
          </ActionIcon>
        </ActionCell>
      </Td>
    </tr>
  );
};

import { ActionIcon } from '@mantine/core';
import { ActionCell } from '../../Shared/TableCells';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import { Contact } from '../../../core/Contact/Contact';

type Props = {
  contact: Contact;
  handleEdit: (contactId: string) => void;
};

export const ContactTableRow = ({ contact }: Props) => {
  const { id, name, lastName, phone } = contact;

  // const dispatch = useDispatch();

  const handleOnEdit = (id: string) => {
    //
  };
  const handleOnDelete = (id: string) => {
    //
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{phone.number}</td>
      <td>{phone.prefix}</td>

      <td>
        <ActionCell>
          <ActionIcon onClick={() => handleOnEdit(id)}>
            <IconPencil />
          </ActionIcon>
          <ActionIcon onClick={() => handleOnDelete(id)}>
            <IconTrash />
          </ActionIcon>
        </ActionCell>
      </td>
    </tr>
  );
};

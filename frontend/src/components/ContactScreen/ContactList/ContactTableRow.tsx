import { ActionIcon } from '@mantine/core';
import { ActionCell, CellWithSubtitle } from '../../Shared/TableCells';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import { Contact } from '../../../core/Contact/Contact';

type Props = {
  contact: Contact;
  handleEdit: (contactId: string) => void;
};

export const ContactTableRow = ({ contact, handleEdit }: Props) => {
  const { id, name, lastName, phone } = contact;

  return (
    <tr>
      <td>
        <CellWithSubtitle title={name} subtitle='' />
      </td>
      <td>{lastName}</td>
      <td>
        {phone.prefix}-{phone.number}
      </td>

      <td>
        <ActionCell>
          <ActionIcon onClick={() => handleEdit(id)}>
            <IconPencil />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              console.log('To implement');
            }}
          >
            <IconTrash />
          </ActionIcon>
        </ActionCell>
      </td>
    </tr>
  );
};

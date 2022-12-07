import { Td } from '../../Shared/Table';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Badge } from '@mantine/core';

import {
  ActionCell,
  BadgeCell,
  CellWithSubtitle,
} from '../../Shared/TableCells';
import { Template } from '../../../core/Template/Template';

export interface Props {
  template: Template;
  handleEdit: (templateId: string) => void;
  handleDelete: (templateId: string) => void;
}

export const TemplateTableRow = ({
  template,
  handleEdit,
  handleDelete,
}: Props) => {
  const { id, name, description, preview, variable1, variable2, variable3 } =
    template;

  return (
    <tr key={id}>
      <Td>
        <CellWithSubtitle title={name || ''} subtitle={description || ''} />
      </Td>
      <Td>{preview}</Td>

      <Td>
        <BadgeCell>
          {variable1 && <Badge color='violet'>{variable1}</Badge>}
          {variable2 && <Badge color='cyan'>{variable2}</Badge>}
          {variable3 && <Badge color='yellow'>{variable3}</Badge>}
        </BadgeCell>
      </Td>
      <Td>
        <ActionCell>
          <ActionIcon onClick={() => handleEdit(id)}>
            <FontAwesomeIcon size='lg' icon={faPen}></FontAwesomeIcon>
          </ActionIcon>
          <ActionIcon onClick={() => handleDelete(id)}>
            <FontAwesomeIcon size='lg' icon={faTrashAlt}></FontAwesomeIcon>
          </ActionIcon>
        </ActionCell>
      </Td>
    </tr>
  );
};

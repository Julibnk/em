import { ActionIcon, Badge } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
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
      <td>
        <CellWithSubtitle title={name || ''} subtitle={description || ''} />
      </td>
      <td>{preview}</td>

      <td>
        <BadgeCell>
          {variable1 && <Badge color='violet'>{variable1}</Badge>}
          {variable2 && <Badge color='cyan'>{variable2}</Badge>}
          {variable3 && <Badge color='yellow'>{variable3}</Badge>}
        </BadgeCell>
      </td>
      <td>
        <ActionCell>
          <ActionIcon
            aria-label='Editar plantilla'
            onClick={() => handleEdit(id)}
          >
            <IconPencil />
          </ActionIcon>
          <ActionIcon
            aria-label='Eliminar plantilla'
            onClick={() => handleDelete(id)}
          >
            <IconTrash />
          </ActionIcon>
        </ActionCell>
      </td>
    </tr>
  );
};

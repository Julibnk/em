import { ActionCell, BadgeCell } from '../../Shared/TableCells';
import { ActionIcon } from '@mantine/core';
import { Category } from '../../../core/Category/Category';
import { Badge } from '../../Shared/Badge';
import { IconPencil, IconTrash } from '@tabler/icons-react';

type Props = {
  category: Category;
  handleEdit: (templateId: string) => void;
  handleDelete: (templateId: string) => void;
};

export const CategoryTableRow = ({
  category,
  handleEdit,
  handleDelete,
}: Props) => {
  const { id, name, description, templates } = category;

  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <BadgeCell>
          {templates.map((template) => {
            return <Badge key={template.id} text={template.name} />;
          })}
        </BadgeCell>
      </td>
      <td>
        <ActionCell>
          <ActionIcon onClick={() => handleEdit(id)}>
            <IconPencil />
          </ActionIcon>
          <ActionIcon onClick={() => handleDelete(id)}>
            <IconTrash />
          </ActionIcon>
        </ActionCell>
      </td>
    </tr>
  );
};

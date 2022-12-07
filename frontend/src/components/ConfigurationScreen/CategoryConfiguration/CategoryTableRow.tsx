import { Td } from '../../Shared/Table';
import { ActionCell, BadgeCell } from '../../Shared/TableCells';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon } from '@mantine/core';
import { Category } from '../../../core/Category/Category';
import { Badge } from '../../Shared/Badge';

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
      <Td emphasized>{name}</Td>
      <Td>{description}</Td>
      <Td>
        <BadgeCell>
          {templates.map((template) => {
            return <Badge key={template.id} text={template.name} />;
          })}
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

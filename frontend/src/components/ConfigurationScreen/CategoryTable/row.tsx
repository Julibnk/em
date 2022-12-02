import { Td } from '../../Shared/MantineOverwrite/Table';
import { ActionCell, BadgeCell } from '../../Shared/TableCells';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon } from '@mantine/core';
import { setModalOpenend } from '../../../store/layout-slice';
import { useDispatch } from '../../../store/store';
import { Category } from '../../../Category/Category';
import { TemplateBadge } from '../../Shared/Badges';
import { setSelectedId } from '../../../Category/category-slice';

type Props = {
  category: Category;
};

export const CategoryTableRow = ({ category }: Props) => {
  const { id, name, description, templateIds } = category;

  const dispatch = useDispatch();

  const handleOnEdit = () => {
    dispatch(setSelectedId(id));
    dispatch(
      setModalOpenend({ modal: 'category', opened: true, mode: 'edit' })
    );
  };
  const handleOnDelete = () => {
    dispatch(setSelectedId(id));
    dispatch(setModalOpenend({ modal: 'category', opened: true }));
  };

  return (
    <tr key={id}>
      <Td emphasized>{name}</Td>
      <Td>{description}</Td>
      <Td>
        <BadgeCell>
          {templateIds.map((templateId) => {
            return (
              <TemplateBadge key={templateId} id={templateId}></TemplateBadge>
            );
          })}
        </BadgeCell>
      </Td>
      <Td>
        <ActionCell>
          <ActionIcon onClick={handleOnEdit}>
            <FontAwesomeIcon size='lg' icon={faPen}></FontAwesomeIcon>
          </ActionIcon>
          <ActionIcon onClick={handleOnDelete}>
            <FontAwesomeIcon size='lg' icon={faTrashAlt}></FontAwesomeIcon>
          </ActionIcon>
        </ActionCell>
      </Td>
    </tr>
  );
};

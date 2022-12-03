import { Td } from '../../Shared/MantineOverwrite/Table';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Badge } from '@mantine/core';

import { setModalOpenend } from '../../Shared/Layout/layout-slice';
import { useDispatch } from '../../../config/store';

import {
  ActionCell,
  BadgeCell,
  CellWithSubtitle,
} from '../../Shared/TableCells';
import { Template } from '../../../Template/Template';
import { CategoryBadge } from '../../Shared/Badges';
import { setSelectedId } from '../../../Template/template-slice';
import { EntityId } from '@reduxjs/toolkit';

type Props = {
  template: Template;
};

export const TemplateTableRow = ({ template }: Props) => {
  const {
    id,
    name,
    description,
    preview,
    categoryIds,
    variable1,
    variable2,
    variable3,
  } = template;

  const dispatch = useDispatch();

  const handleOnEdit = (id: EntityId) => {
    dispatch(setSelectedId(id));
    dispatch(
      setModalOpenend({ modal: 'template', opened: true, mode: 'edit' })
    );
  };
  const handleOnDelete = (id: EntityId) => {
    dispatch(setSelectedId(id));
    dispatch(setModalOpenend({ modal: 'template', opened: true }));
  };

  return (
    <tr key={id}>
      <Td>
        <CellWithSubtitle title={name} subtitle={description || ''} />
      </Td>
      {/* <Td>{description}</Td> */}
      <Td>{preview}</Td>

      <Td>
        <BadgeCell>
          {variable1 && <Badge color='violet'>{variable1}</Badge>}
          {variable2 && <Badge color='cyan'>{variable2}</Badge>}
          {variable3 && <Badge color='yellow'>{variable3}</Badge>}
        </BadgeCell>
      </Td>
      <Td>
        {/* <BadgeCell>
          {categoryIds.map((id) => {
            return <CategoryBadge key={id} id={id}></CategoryBadge>;
          })}
        </BadgeCell> */}
      </Td>
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

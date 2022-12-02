import { Badge, MantineColor } from '@mantine/core';
import { EntityId } from '@reduxjs/toolkit';
import { selectCategoryById } from '../../../Category/category-selector';
import { useSelector } from '../../../config/store';
import { selectTemplateById } from '../../../Template/template-selector';

type Props = {
  id: EntityId;
  color?: MantineColor;
};

export const CategoryBadge = ({ id, color = 'turquoise' }: Props) => {
  const category = useSelector((state) => selectCategoryById(state, id));

  if (typeof category === 'undefined') return <></>;

  return <Badge color={color}>{category.name}</Badge>;
};

export const TemplateBadge = ({ id, color = 'turquoise' }: Props) => {
  const template = useSelector((state) => selectTemplateById(state, id));

  if (typeof template === 'undefined') return <></>;

  return <Badge color={color}>{template.name}</Badge>;
};

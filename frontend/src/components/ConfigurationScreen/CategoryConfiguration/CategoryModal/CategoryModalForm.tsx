import { useForm } from '@mantine/form';
import { MultiSelect, SelectItem, TextInput } from '@mantine/core';
import { Category, CategoryOnlyIds } from '../../../../core/Category/Category';
import { useTranslation } from '../../../Shared/hooks/useTranslation';
import { Template } from '../../../../core/Template/Template';

export interface Props {
  handleSubmit: (category: CategoryOnlyIds) => void;
  category: Category;
  allTemplates: Template[];
}

export const CategoryModalForm = ({
  handleSubmit,
  category,
  allTemplates,
}: Props) => {
  const t = useTranslation();

  const form = useForm({
    initialValues: {
      ...category,
      templates: category.templates.map((template) => template.id),
    },
  });

  const multiSelectData: SelectItem[] = allTemplates.map((template) => ({
    value: template.id,
    label: template.name,
  }));

  return (
    <form
      id='category-form'
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <TextInput required label={t('name')} {...form.getInputProps('name')} />
      <TextInput
        label={t('description')}
        {...form.getInputProps('description')}
      />
      <MultiSelect
        data={multiSelectData}
        label={t('template', { plural: true })}
        {...form.getInputProps('templates')}
      />
    </form>
  );
};

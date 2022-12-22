import { useForm } from '@mantine/form';
import {
  Button,
  Group,
  MultiSelect,
  SelectItem,
  TextInput,
} from '@mantine/core';
import { SecondaryButton } from '../../../Shared/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Category, CategoryOnlyIds } from '../../../../core/Category/Category';
import { ModalMode } from '../../../Shared/Modal/Modal';
import { Nullable } from '../../../../core/Shared/Nullable';
import { useTranslation } from '../../../../core/Shared/hooks/useTranslation';
import { Template } from '../../../../core/Template/Template';

export interface Props {
  handleClose: () => void;
  handleSubmit: (category: CategoryOnlyIds) => void;
  category: Category;
  allTemplates: Template[];
  mode: Nullable<ModalMode>;
}

export const CategoryModalForm = ({
  handleClose,
  handleSubmit,
  category,
  mode,
  allTemplates,
}: Props) => {
  const t = useTranslation();

  const form = useForm({
    initialValues: {
      ...category,
      templates: category.templates.map((template) => template.id),
    },
  });

  const mainButtonIcon = mode === 'CREATE' ? faFile : faFloppyDisk;
  const mainButtonText = mode === 'CREATE' ? t('create') : t('save');

  const multiSelectData: SelectItem[] = allTemplates.map((template) => ({
    value: template.id,
    label: template.name,
  }));

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>{t('cancel')}</SecondaryButton>
        <Button
          type='submit'
          leftIcon={<FontAwesomeIcon icon={mainButtonIcon} />}
        >
          {mainButtonText}
        </Button>
      </Group>
    </form>
  );
};

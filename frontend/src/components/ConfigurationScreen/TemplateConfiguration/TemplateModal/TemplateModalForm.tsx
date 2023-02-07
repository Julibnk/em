import styles from './styles.module.css';

import { useForm } from '@mantine/form';
import { TextInput, Textarea, Alert } from '@mantine/core';
import { useTranslation } from '../../../Shared/hooks/useTranslation';
import { Template } from '../../../../core/Template/Template';
import { Nullable } from '../../../../core/Shared/Nullable';
import { ModalMode } from '../../../Shared/ModalTitle';
import { IconAlertTriangle } from '@tabler/icons-react';
export interface Props {
  handleSubmit: (template: Template) => void;
  template: Template;
  mode: Nullable<ModalMode>;
}

export const TemplateForm = ({ handleSubmit, template, mode }: Props) => {
  const t = useTranslation();

  //TODO Traducir
  const form = useForm({
    initialValues: template,
    validate: {
      name: (value) => !value && 'El nombre de la plantilla es obligatorio',
      variable2(value, values) {
        if (value && !values.variable1) {
          return 'Las variables deben de estar definidas en orden';
        }
      },
      variable3(value, values) {
        if (value && (!values.variable2 || !values.variable1)) {
          return 'Las variables deben de estar definidas en orden';
        }
      },
    },
  });

  const nameDisabled = mode === 'EDIT';

  return (
    <form
      id='template-form'
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <Alert
        icon={<IconAlertTriangle />}
        title={t('template_warning_title')}
        color='yellow'
        className={styles.alert}
      >
        <p>{t('template_warning_content')}</p>
        <a
          href='https://business.facebook.com/home/accounts?business_id=3104150219846655&global_scope_id=3104150219846655'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('go_to_waba_console')} &#8594;
        </a>
      </Alert>

      <TextInput
        withAsterisk
        label={t('name')}
        disabled={nameDisabled}
        {...form.getInputProps('name')}
      />

      <TextInput
        label={t('description')}
        {...form.getInputProps('description')}
      />

      <Textarea
        autosize
        minRows={4}
        label={t('preview')}
        placeholder={t('template_preview_placeholder')}
        {...form.getInputProps('preview')}
      />

      <div className={styles.variableInputs}>
        <TextInput
          label={t('variable_number', { number: 1 })}
          placeholder={'{{1}}'}
          {...form.getInputProps('variable1')}
        />
        <TextInput
          label={t('variable_number', { number: 2 })}
          placeholder={'{{2}}'}
          {...form.getInputProps('variable2')}
        />
        <TextInput
          label={t('variable_number', { number: 3 })}
          placeholder={'{{3}}'}
          {...form.getInputProps('variable3')}
        />
      </div>
    </form>
  );
};

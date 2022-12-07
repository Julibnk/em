import styles from './styles.module.css';

import { useForm } from '@mantine/form';
import { Button, Group, TextInput, Textarea, Alert } from '@mantine/core';
import { SecondaryButton } from '../../../Shared/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import {
  faFloppyDisk,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from '../../../../Shared/hooks/useTranslation';
import { Template } from '../../../../Template/Template';
import { ModalMode } from '../../../Shared/Modal/Modal';
import { Nullable } from '../../../../Shared/Nullable';

export interface Props {
  handleClose: () => void;
  handleSubmit: () => void;
  template: Template;
  mode: Nullable<ModalMode>;
}

export const TemplateForm = ({
  handleClose,
  handleSubmit,
  template,
  mode,
}: Props) => {
  const t = useTranslation();

  const form = useForm({ initialValues: template });

  const mainButtonIcon = mode === 'CREATE' ? faFile : faFloppyDisk;
  const mainButtonText = mode === 'CREATE' ? t('create') : t('save');

  return (
    <form className='modal_form' onSubmit={form.onSubmit(handleSubmit)}>
      <Alert
        icon={<FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>}
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

      <TextInput required label={t('name')} {...form.getInputProps('name')} />

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
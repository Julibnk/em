// import styles from './styles.module.css';
import {
  faFile,
  faFloppyDisk,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group, Select, Textarea, TextInput } from '@mantine/core';
import { InputLabel } from '@mantine/core/lib/Input/InputLabel/InputLabel';
import { useForm } from '@mantine/form';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { Nullable } from '../../../core/Shared/Nullable';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { ModalMode } from '../../Shared/Modal/Modal';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { Text } from '@mantine/core';

export interface Props {
  handleClose: () => void;
  handleSubmit: (message: TemplateMessage) => void;
  message: TemplateMessage;
  mode: Nullable<ModalMode>;
}

export const MessageForm = ({
  handleClose,
  handleSubmit,
  message,
  mode,
}: Props) => {
  const t = useTranslation();

  //TODO Traducir
  const form = useForm({
    initialValues: message,
    validate: {
      // name: (value) => !value && 'El nombre de la plantilla es obligatorio',
      // variable2(value, values) {
      //   if (value && !values.variable1) {
      //     return 'Las variables deben de estar definidas en orden';
      //   }
      // },
      // variable3(value, values) {
      //   if (value && (!values.variable2 || !values.variable1)) {
      //     return 'Las variables deben de estar definidas en orden';
      //   }
      // },
    },
  });

  // const mainButtonIcon = mode === 'CREATE' ? faFile : faFloppyDisk;
  // const mainButtonText = mode === 'CREATE' ? t('create') : t('save');
  // const nameDisabled = mode === 'EDIT';

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        withAsterisk
        label={t('name')}
        {...form.getInputProps('name')}
      />

      <Select
        data={[
          { value: '1', label: '1' },
          { value: '1', label: '1' },
          { value: '1', label: '1' },
          { value: '1', label: '1' },
        ]}
        value='1'
      />
      <Select
        data={[
          { value: '1', label: '1' },
          { value: '1', label: '1' },
          { value: '1', label: '1' },
          { value: '1', label: '1' },
        ]}
        value='1'
      />

      <TextInput
        label={t('description')}
        {...form.getInputProps('description')}
      />

      <Text fz='xs'>Default text</Text>
      <div className='flex gap-sm'>
        <TextInput placeholder={'{{1}}'} {...form.getInputProps('variable1')} />
        <TextInput placeholder={'{{2}}'} {...form.getInputProps('variable2')} />
        <TextInput placeholder={'{{3}}'} {...form.getInputProps('variable3')} />
      </div>

      <Text fz='xs'>Default text</Text>
      <div className='flex gap-sm'>
        <TextInput placeholder={'{{1}}'} {...form.getInputProps('variable1')} />
        <TextInput placeholder={'{{2}}'} {...form.getInputProps('variable2')} />
        <TextInput placeholder={'{{3}}'} {...form.getInputProps('variable3')} />
      </div>

      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>{t('cancel')}</SecondaryButton>
        <Button
          role={'submit'}
          type='submit'
          leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          {t('send')}
        </Button>
      </Group>
    </form>
  );
};

// import styles from './styles.module.css';
import {
  faFile,
  faFloppyDisk,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Group,
  Select,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { InputLabel } from '@mantine/core/lib/Input/InputLabel/InputLabel';
import { useForm } from '@mantine/form';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { Nullable } from '../../../core/Shared/Nullable';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { ModalMode } from '../../Shared/Modal/Modal';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { Text } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';

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
        // withAsterisk
        label={t('name')}
        {...form.getInputProps('name')}
      />

      <Text className='input_label' size={14} weight={500}>
        Teléfono
      </Text>
      <div className='flex gap-sm'>
        <TextInput
          withAsterisk
          placeholder='+34'
          {...form.getInputProps('phone')}
        />
        <TextInput withAsterisk {...form.getInputProps('phone')} />
      </div>

      <Select
        label='Categoría'
        data={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
        ]}
        value='1'
      />

      <Select
        label='Plantilla'
        data={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
        ]}
        value='1'
      />

      <TextInput
        label={t('description')}
        {...form.getInputProps('description')}
      />

      <Text className='input_label' size={14} weight={500}>
        Variables
      </Text>
      <div className='flex gap-sm input_label'>
        <TextInput placeholder={'{{1}}'} {...form.getInputProps('variable1')} />
        <TextInput placeholder={'{{2}}'} {...form.getInputProps('variable2')} />
        <TextInput placeholder={'{{3}}'} {...form.getInputProps('variable3')} />
      </div>

      <Text className='input_label' size={14} weight={500}>
        Programar envío
      </Text>
      <div className='flex gap-sm'>
        <Switch />
        <DatePicker placeholder='Pick date' withAsterisk />
        <TimeInput withSeconds defaultValue={new Date()} />
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

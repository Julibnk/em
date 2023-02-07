import { Select, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { Text } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';

export interface Props {
  handleSubmit: (message: TemplateMessage) => void;
  message: TemplateMessage;
}

export const MessageForm = ({ handleSubmit, message }: Props) => {
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
      <div>
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
      <div>
        <TextInput placeholder={'{{1}}'} {...form.getInputProps('variable1')} />
        <TextInput placeholder={'{{2}}'} {...form.getInputProps('variable2')} />
        <TextInput placeholder={'{{3}}'} {...form.getInputProps('variable3')} />
      </div>

      <Text className='input_label' size={14} weight={500}>
        Programar envío
      </Text>
      <div>
        <Switch />
        <DatePicker placeholder='Pick date' withAsterisk />
        <TimeInput withSeconds defaultValue={new Date()} />
      </div>
    </form>
  );
};

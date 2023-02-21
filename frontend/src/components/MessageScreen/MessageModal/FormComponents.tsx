import { UseFormReturnType } from '@mantine/form';
import styles from './styles.module.css';

import { Input, NumberInput, Select, Switch, TextInput } from '@mantine/core';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { DatePicker, TimeInput } from '@mantine/dates';

interface FormInputProps {
  form: UseFormReturnType<TemplateMessage>;
}

export const PhoneInput = ({ form }: FormInputProps) => {
  return (
    <Input.Wrapper withAsterisk label='Teléfono'>
      <div className={styles.phoneInput}>
        <TextInput
          placeholder='+34'
          {...form.getInputProps('contact.phone.prefix')}
        />
        <NumberInput
          hideControls
          {...form.getInputProps('contact.phone.number')}
        />
      </div>
    </Input.Wrapper>
  );
};
export const CategorySelect = ({ form }: FormInputProps) => {
  return (
    <Select
      label='Categoría'
      data={[
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
      ]}
      {...form.getInputProps('categoryId')}
    />
  );
};

export const TemplateSelect = ({ form }: FormInputProps) => {
  return (
    <Select
      label='Plantilla'
      data={[
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
      ]}
      withAsterisk
      {...form.getInputProps('templateId')}
    />
  );
};
export const NameInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Nombre contacto'
      {...form.getInputProps('contact.name')}
    />
  );
};

export const VariablesInput = ({ form }: FormInputProps) => {
  return (
    <Input.Wrapper label='Variables'>
      <div className={styles.variables}>
        <TextInput
          placeholder={'{{1}}'}
          {...form.getInputProps('parameter1')}
        />
        <TextInput
          placeholder={'{{2}}'}
          {...form.getInputProps('parameter2')}
        />
        <TextInput
          placeholder={'{{3}}'}
          {...form.getInputProps('parameter3')}
        />
      </div>
    </Input.Wrapper>
  );
};

export const ScheduleInput = ({ form }: FormInputProps) => {
  return (
    <Input.Wrapper label='Programar envío'>
      <div className={styles.schedule}>
        <Switch {...form.getInputProps('isScheduled')} />
        <DatePicker
          disabled={!form.values.isScheduled}
          placeholder='Pick date'
          withAsterisk
          {...form.getInputProps('scheduleDate')}
        />
        <TimeInput
          disabled={!form.values.isScheduled}
          withSeconds
          defaultValue={new Date()}
        />
      </div>
    </Input.Wrapper>
  );
};

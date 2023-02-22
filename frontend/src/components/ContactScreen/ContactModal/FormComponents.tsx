import { UseFormReturnType } from '@mantine/form';
import styles from './styles.module.css';
import { Input, NumberInput, TextInput } from '@mantine/core';
import { Contact } from '../../../core/Contact/Contact';

interface FormInputProps {
  form: UseFormReturnType<Contact>;
}

export const PhoneInput = ({ form }: FormInputProps) => {
  return (
    <Input.Wrapper withAsterisk label='Teléfono'>
      <div className={styles.phoneInput}>
        <TextInput placeholder='+34' {...form.getInputProps('phone.prefix')} />
        <NumberInput hideControls {...form.getInputProps('phone.number')} />
      </div>
    </Input.Wrapper>
  );
};

export const NameInput = ({ form }: FormInputProps) => {
  return <TextInput label='Nombre' {...form.getInputProps('name')} />;
};

export const LastNameInput = ({ form }: FormInputProps) => {
  return <TextInput label='Apellidos' {...form.getInputProps('lastName')} />;
};

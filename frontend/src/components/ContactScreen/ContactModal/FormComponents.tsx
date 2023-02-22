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

export const NameInput = ({ form }: FormInputProps) => {
  return <TextInput label='Nombre' {...form.getInputProps('contact.name')} />;
};

export const LastNameInput = ({ form }: FormInputProps) => {
  return (
    <TextInput label='Apellidos' {...form.getInputProps('contact.lastName')} />
  );
};

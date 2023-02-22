import { UseFormReturnType } from '@mantine/form';
import styles from './styles.module.css';

import { Select, TextInput } from '@mantine/core';

interface FormInputProps {
  form: UseFormReturnType<any>;
}

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

export const StreetInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Nombre contacto'
      {...form.getInputProps('contact.name')}
    />
  );
};

export const AddressNumberInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Nombre contacto'
      {...form.getInputProps('contact.name')}
    />
  );
};

export const PostalCodeInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Nombre contacto'
      {...form.getInputProps('contact.name')}
    />
  );
};
export const RegionInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Nombre contacto'
      {...form.getInputProps('contact.name')}
    />
  );
};
export const CountryInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Nombre contacto'
      {...form.getInputProps('contact.name')}
    />
  );
};

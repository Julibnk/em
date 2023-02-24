import { UseFormReturnType } from '@mantine/form';

import { Select, TextInput } from '@mantine/core';
import { Account } from '../../../core/Account/Account';

interface FormInputProps {
  form: UseFormReturnType<Account>;
}

export const CompanyNameInput = ({ form }: FormInputProps) => {
  return <TextInput label='Empresa' {...form.getInputProps('companyName')} />;
};

export const VatInut = ({ form }: FormInputProps) => {
  return <TextInput label='CIF' {...form.getInputProps('vat')} />;
};
export const StreetInput = ({ form }: FormInputProps) => {
  return (
    <TextInput label='Dirección' {...form.getInputProps('address.street')} />
  );
};

export const NumberInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Número'
      {...form.getInputProps('address.addressNumber')}
    />
  );
};
export const PostalCodeInput = ({ form }: FormInputProps) => {
  return (
    <TextInput
      label='Cod. postal'
      {...form.getInputProps('address.postalCode')}
    />
  );
};

export const RegionCodeSelect = ({ form }: FormInputProps) => {
  return (
    <Select
      label='Región'
      data={[{ value: '01', label: 'Asturias' }]}
      {...form.getInputProps('address.region')}
    />
  );
};

export const CountryCodeSelect = ({ form }: FormInputProps) => {
  return (
    <Select
      label='Pais'
      data={[{ value: 'ES', label: 'España' }]}
      {...form.getInputProps('address.country')}
    />
  );
};
export const BussinesIdInput = ({ form }: FormInputProps) => {
  return (
    <TextInput label='Bussines Id' {...form.getInputProps('addressNumber')} />
  );
};

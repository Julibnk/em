import { TextInput, Title } from '@mantine/core';
import styles from './styles.module.css';

import { AccountSectionFooter } from './AccountSectionFooter';
import { useForm } from '@mantine/form';
import {
  BussinesIdInput,
  CompanyNameInput,
  CountryCodeSelect,
  NumberInput,
  PostalCodeInput,
  RegionCodeSelect,
  StreetInput,
  VatInut,
} from './FormComponents';
import { Account, initialAccount } from '../../../core/Account/Account';
import { useAccountSection } from './useAccountSection';
import { LoadingOverlay } from '../../Shared/Loading';

export const AccountSection = () => {
  const { account, isLoading } = useAccountSection();

  const form = useForm<Account>({ initialValues: account ?? initialAccount });

  return (
    <div className={styles.formContainer}>
      <LoadingOverlay loading={isLoading}></LoadingOverlay>
      <form
        id='account-form'
        // onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <fieldset>
          <legend>Información fiscal</legend>
          <div className={styles.content}>
            <CompanyNameInput form={form} />
            <VatInut form={form} />
          </div>
        </fieldset>
        <fieldset>
          <legend>Dirección</legend>
          <div className={styles.content}>
            <StreetInput form={form} />
            <NumberInput form={form} />
            <PostalCodeInput form={form} />
            <RegionCodeSelect form={form} />
            <CountryCodeSelect form={form} />
          </div>
        </fieldset>
        <fieldset>
          <legend>Meta info</legend>
          <div className={styles.content}>
            <BussinesIdInput form={form} />
          </div>
        </fieldset>
      </form>
      <AccountSectionFooter />
    </div>
  );
};

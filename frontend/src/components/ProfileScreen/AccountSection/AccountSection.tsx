import { TextInput } from '@mantine/core';
import { HorizontalBar } from '../../Shared/HorizontalBar/HorizontalBar';
import { SecondaryTitle } from '../../Shared/Titles/SecondaryTitle';
import { AccountSectionHeader } from './AccountSectionHeader';

export const AccountSection = () => {
  return (
    <>
      <AccountSectionHeader />
      <HorizontalBar />
      <div style={{ padding: '2.4rem 2.4rem 1.2rem 2.4rem' }}>
        <div style={{ display: 'flex', paddingBottom: '1.2rem' }}>
          <div style={{ flexBasis: '33.33%' }}>
            <SecondaryTitle text={'Información fiscal'} order={5} />
          </div>
          <div style={{ flexBasis: '66.66%', paddingRight: '25%' }}>
            <form

            // onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <TextInput />
              <TextInput />
            </form>
          </div>
        </div>
        <HorizontalBar />
      </div>
      <div style={{ padding: '2.4rem' }}>
        <div style={{ display: 'flex', paddingBottom: '1.2rem' }}>
          <div style={{ flexBasis: '33.33%' }}>
            <SecondaryTitle text={'Direccion'} order={5} />
          </div>
          <div style={{ flexBasis: '66.66%', paddingRight: '25%' }}>
            <form
            // onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <TextInput />
              <TextInput />
            </form>
          </div>
        </div>
        <HorizontalBar />
      </div>
    </>
  );
};

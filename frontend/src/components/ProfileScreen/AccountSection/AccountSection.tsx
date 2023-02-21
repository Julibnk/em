import { TextInput, Title } from '@mantine/core';
// import { SecondaryTitle } from '../../Shared/Titles/SecondaryTitle';
import { AccountSectionHeader } from './AccountSectionHeader';

export const AccountSection = () => {
  return (
    <>
      <AccountSectionHeader />

      <div style={{ padding: '1.8rem' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '33.33%' }}>
            <Title order={5}>{'Información fiscal'}</Title>
          </div>
          <div style={{ flexBasis: '66.66%', paddingRight: '25%' }}>
            <form

            // onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <TextInput disabled placeholder='Nombre' />
              <TextInput disabled placeholder='Cif' />
            </form>
          </div>
        </div>
      </div>

      <div style={{ padding: '1.8rem' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '33.33%' }}>
            <Title order={5}>{'Direccion'}</Title>
          </div>
          <div style={{ flexBasis: '66.66%', paddingRight: '25%' }}>
            <form
            // onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <div>
                <TextInput />

                <TextInput />
              </div>
              <TextInput />
              <TextInput />
              <TextInput />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

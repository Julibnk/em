import { TextInput } from '@mantine/core';
import { HorizontalBar } from '../../Shared/HorizontalBar/HorizontalBar';
import { SecondaryTitle } from '../../Shared/Titles/SecondaryTitle';
import { AccountSectionHeader } from './AccountSectionHeader';

export const AccountSection = () => {
  return (
    <>
      <AccountSectionHeader />
      <HorizontalBar />
      <div style={{ padding: '1.8rem' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '33.33%' }}>
            <SecondaryTitle text={'Información fiscal'} order={5} />
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
      <HorizontalBar />
      <div style={{ padding: '1.8rem' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '33.33%' }}>
            <SecondaryTitle text={'Direccion'} order={5} />
          </div>
          <div style={{ flexBasis: '66.66%', paddingRight: '25%' }}>
            <form
            // onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <div className='flex gap-sm'>
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
      <HorizontalBar />
    </>
  );
};

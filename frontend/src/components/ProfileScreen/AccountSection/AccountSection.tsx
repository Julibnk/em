import { TextInput, Title } from '@mantine/core';
import styles from './styles.module.css';
// import { SecondaryTitle } from '../../Shared/Titles/SecondaryTitle';
import { AccountSectionHeader } from './AccountSectionHeader';
import { useForm } from '@mantine/form';
import { CategorySelect } from './FormComponents';

export const AccountSection = () => {
  const form = useForm<any>({});

  return (
    <>
      <AccountSectionHeader />

      <div className={styles.formContainer}>
        <form
          id='account-form'
          // onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
          <fieldset>
            <legend>Información fiscal</legend>
            <div className={styles.content}>
              <CategorySelect form={form} />
              <CategorySelect form={form} />
              <CategorySelect form={form} />
              <CategorySelect form={form} />
            </div>
          </fieldset>
          <fieldset>
            <legend>Dirección</legend>
            <div className={styles.content}>
              <CategorySelect form={form} />
              <CategorySelect form={form} />
              <CategorySelect form={form} />
              <CategorySelect form={form} />
              {/* <ContractDatesInput form={form} /> */}
              {/* <PenaltyTypeInput form={form} /> */}
            </div>
          </fieldset>
          {/* <fieldset> */}
          {/* <legend>{t('integrationInfo')}</legend> */}
          {/* <div className={styles.content}> */}
          {/* <DimensionCodeInput form={form} /> */}
          {/* <ErpCustomerCodeInput form={form} /> */}
          {/* </div> */}
          {/* </fieldset> */}
        </form>
      </div>
    </>
  );
};
// export const AccountSection = () => {
//   return (
//     <>
//       <AccountSectionHeader />

//       <div style={{ padding: '1.8rem' }}>
//         <div style={{ display: 'flex' }}>
//           <div style={{ flexBasis: '33.33%' }}>
//             <Title order={5}>{'Información fiscal'}</Title>
//           </div>
//           <div style={{ flexBasis: '66.66%', paddingRight: '25%' }}>
//             <form

//             // onSubmit={form.onSubmit((values) => handleSubmit(values))}
//             >
//               <TextInput disabled placeholder='Nombre' />
//               <TextInput disabled placeholder='Cif' />
//             </form>
//           </div>
//         </div>
//       </div>

//       <div style={{ padding: '1.8rem' }}>
//         <div style={{ display: 'flex' }}>
//           <div style={{ flexBasis: '33.33%' }}>
//             <Title order={5}>{'Direccion'}</Title>
//           </div>
//           <div style={{ flexBasis: '66.66%', paddingRight: '25%' }}>
//             <form
//             // onSubmit={form.onSubmit((values) => handleSubmit(values))}
//             >
//               <div>
//                 <TextInput />

//                 <TextInput />
//               </div>
//               <TextInput />
//               <TextInput />
//               <TextInput />
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

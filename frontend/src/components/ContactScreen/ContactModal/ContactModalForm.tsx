import { useForm } from '@mantine/form';
import { Contact } from '../../../core/Contact/Contact';
import { LastNameInput, NameInput, PhoneInput } from './FormComponents';

export interface Props {
  handleSubmit: (contact: Contact) => void;
  contact: Contact;
}

export const ContactModalForm = ({ handleSubmit, contact }: Props) => {
  const form = useForm<Contact>({
    initialValues: contact,
    // validate: {
    //   contact: {
    //     phone: {
    //       number: notEmpty('El número de teléfono es obligatorio'),
    //     },
    //   },
    //   templateId: notEmpty('La plantilla es obligatoria'),
    // },
    transformValues: (values) => ({
      ...values,
      phone: {
        ...values.phone,
        number: String(values.phone.number),
      },
    }),
  });

  return (
    <form
      id='contact-form'
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <PhoneInput form={form} />
      <NameInput form={form} />
      <LastNameInput form={form} />
    </form>
  );
};

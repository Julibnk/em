import { notEmpty, useForm } from '@mantine/form';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import {
  CategorySelect,
  NameInput,
  PhoneInput,
  ScheduleInput,
  TemplateSelect,
  VariablesInput,
} from './FormComponents';

export interface Props {
  handleSubmit: (message: TemplateMessage) => void;
  message: TemplateMessage;
}

export const MessageForm = ({ handleSubmit, message }: Props) => {
  const form = useForm<TemplateMessage>({
    initialValues: message,
    validate: {
      contact: {
        phone: {
          number: notEmpty('El número de teléfono es obligatorio'),
        },
      },
      templateId: notEmpty('La plantilla es obligatoria'),
    },
  });

  return (
    <form
      id='message-form'
      onSubmit={form.onSubmit((values) => {
        console.log(values);
        handleSubmit(values);
      })}
    >
      <PhoneInput form={form} />
      <TemplateSelect form={form} />
      <CategorySelect form={form} />
      <NameInput form={form} />
      <VariablesInput form={form} />
      <ScheduleInput form={form} />
    </form>
  );
};

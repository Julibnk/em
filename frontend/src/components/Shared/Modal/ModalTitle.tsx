import { useTranslation } from '../../../Shared/hooks/useTranslation';
import { Nullable } from '../../../Shared/Nullable';
import { ModalMode } from './Modal';

export enum ModalTitleEntity {
  CATEGORY = 'category',
  TEMPLATE = 'template',
}

interface Props {
  mode: Nullable<ModalMode>;
  entity: ModalTitleEntity;
  subject?: string;
}

export const ModalTitle = ({ mode, subject, entity }: Props) => {
  const t = useTranslation();

  if (!mode) {
    return <h3></h3>;
  }

  if (mode === 'EDIT') {
    return <h3>{t('edit_subject', { subject })}</h3>;
  }

  return (
    <h3>{t('create_subject', { subject: t(entity, { plural: false }) })}</h3>
  );
};

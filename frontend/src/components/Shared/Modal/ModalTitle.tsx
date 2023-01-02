import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { Nullable } from '../../../core/Shared/Nullable';
import { ModalMode } from './Modal';

//TODO - Translate
export enum ModalTitleEntity {
  CATEGORY = 'categoria',
  TEMPLATE = 'plantilla',
  MESSAGE = 'mensaje',
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

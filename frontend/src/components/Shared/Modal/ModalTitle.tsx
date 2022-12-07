import { useTranslation } from '../../../Shared/hooks/useTranslation';
import { Nullable } from '../../../Shared/Nullable';
import { ModalMode } from './Modal';

interface ModalTitleProps {
  mode: Nullable<ModalMode>;
  subject?: string;
}

export const ModalTitle = (props: ModalTitleProps) => {
  const { mode, subject } = props;
  const t = useTranslation();

  if (!mode) {
    return <h3></h3>;
  }

  if (mode === 'EDIT') {
    return <h3>{t('edit_subject', { subject })}</h3>;
  }

  return (
    <h3>
      {t('create_subject', { subject: t('template', { plural: false }) })}
    </h3>
  );
};

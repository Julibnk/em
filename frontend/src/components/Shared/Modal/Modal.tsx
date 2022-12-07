import { Modal as MantineModal, ModalProps } from '@mantine/core';
import { useTranslation } from '../../../Shared/hooks/useTranslation';
import { Nullable } from '../../../Shared/Nullable';
import styles from './styles.module.css';

export enum ModalMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DISPLAY = 'DISPLAY',
}

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

export const Modal = (props: ModalProps) => {
  const customProps: ModalProps = {
    classNames: {
      modal: styles.modal,
      header: styles.header,
      title: styles.title,
      body: styles.body,
      close: styles.close,
    },
    centered: true,
    closeOnClickOutside: false,
    ...props,
  };

  return <MantineModal {...customProps} />;
};

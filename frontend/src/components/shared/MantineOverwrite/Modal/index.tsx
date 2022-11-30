import { Modal as MantineModal, ModalProps } from '@mantine/core';
import styles from './styles.module.css';

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

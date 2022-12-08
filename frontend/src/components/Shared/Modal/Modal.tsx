import { Modal as MantineModal, ModalProps } from '@mantine/core';

import styles from './styles.module.css';
import { LoadingOverlay } from '../Loading';

export enum ModalMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DISPLAY = 'DISPLAY',
}

export type Props = {
  loading: boolean;
} & ModalProps;

export const Modal = (props: Props) => {
  const { loading, ...rest } = props;

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
    overflow: 'inside',
    ...rest,
  };

  return (
    <MantineModal {...customProps}>
      <LoadingOverlay loading={loading} />
      {props.children}
    </MantineModal>
  );
};

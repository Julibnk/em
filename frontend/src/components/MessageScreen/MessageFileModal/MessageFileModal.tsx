import { Button, Group, Modal, ModalProps } from '@mantine/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import { Dropzone } from '@mantine/dropzone';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { MessageFileModalState } from './messageFileModalReducer';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { ModalTitle, ModalTitleEntity } from '../../Shared/ModalTitle';
import { LoadingOverlay } from '../../Shared/Loading';

interface Props {
  state: MessageFileModalState;
  handleClose: () => void;
}

export const MessageFileModal = ({ state, handleClose }: Props) => {
  const t = useTranslation();

  const { opened, loading } = state;

  const modalProps: ModalProps = {
    opened,
    onClose: handleClose,
    title: (
      <ModalTitle
        mode={null}
        entity={ModalTitleEntity.MESSAGE}
        subject={t('message_load')}
      />
    ),
    size: 600,
  };

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
      >
        {/* {() => {
          return <h1>AAA</h1>;
        }} */}
      </Dropzone>
      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>{t('cancel')}</SecondaryButton>
        <Button
          type='submit'
          leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
        >
          {t('load')}
        </Button>
      </Group>
    </Modal>
  );
};

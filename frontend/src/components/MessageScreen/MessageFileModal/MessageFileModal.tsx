import { Button, Group } from '@mantine/core';
// import { Modal } from '../../../Modal/Modal';
// import { setModalOpenend } from '../../layout-slice';
// import { useSelector, useDispatch } from '../../../../../config/store';
// import { selectModal } from '../../layout-selector';

// import { SecondaryButton } from '../../../SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import { Dropzone } from '@mantine/dropzone';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { MessageFileModalState } from './messageFileModalReducer';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { Modal, Props as ModalProps } from '../../Shared/Modal/Modal';
import { ModalTitle, ModalTitleEntity } from '../../Shared/Modal/ModalTitle';

interface Props {
  state: MessageFileModalState;
  handleClose: () => void;
}

export const MessageFileModal = ({ state, handleClose }: Props) => {
  const t = useTranslation();

  const { opened, loading } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: (
      <ModalTitle
        mode={null}
        entity={ModalTitleEntity.MESSAGE}
        subject={t('message_load')}
      />
    ),
    size: 600,
    loading,
  };

  return (
    <Modal {...modalProps}>
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

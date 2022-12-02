import { Button, Group, ModalProps } from '@mantine/core';
import { Modal } from '../../../../shared/MantineOverwrite/Modal';
import { setModalOpenend } from '../../../../../store/layout-slice';
import { useSelector, useDispatch } from '../../../../../store/store';
import { selectModal } from '../../../../../store/layout-selector';

import { SecondaryButton } from '../../../../shared/MantineOverwrite/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import { Dropzone } from '@mantine/dropzone';
import { useTranslation } from '../../../../../shared/hooks/useTranslation';

export const MessageLoadModal = () => {
  const dispatch = useDispatch();

  const t = useTranslation();

  const modalState = useSelector((state) => selectModal(state, 'message_load'));

  const { opened } = modalState;

  const handleOnClose = () => {
    dispatch(setModalOpenend({ modal: 'message_load', opened: false }));
  };

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleOnClose,
    title: t('message_load'),
    size: 600,
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
        <SecondaryButton onClick={handleOnClose}>{t('cancel')}</SecondaryButton>
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

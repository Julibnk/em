import { CategoryModal } from './Shared/Layout/Modals/CategoryModal/index';
import { TemplateModal } from './Shared/Layout/Modals/TemplateModal/index';
import { MessageLoadModal } from './Shared/Layout/Modals/MessageLoadModal/index';
import { MessageModal } from './Shared/Layout/Modals/MessageModal/index';
export const Modals = () => {
  return (
    <>
      <CategoryModal />
      <TemplateModal />
      <MessageLoadModal />
      <MessageModal />
    </>
  );
};

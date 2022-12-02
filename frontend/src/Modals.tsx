import { CategoryModal } from './components/shared/Layout/Modals/CategoryModal/index';
import { TemplateModal } from './components/shared/Layout/Modals/TemplateModal/index';
import { MessageLoadModal } from './components/shared/Layout/Modals/MessageLoadModal/index';
import { MessageModal } from './components/shared/Layout/Modals/MessageModal/index';
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

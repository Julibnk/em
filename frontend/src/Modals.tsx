import { CategoryModal } from './components/Shared/Layout/Modals/CategoryModal/index';
import { TemplateModal } from './components/Shared/Layout/Modals/TemplateModal/index';
import { MessageLoadModal } from './components/Shared/Layout/Modals/MessageLoadModal/index';
import { MessageModal } from './components/Shared/Layout/Modals/MessageModal/index';
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

import { CategoryModal } from '../../../ConfigurationScreen/CategoryTable/CategoryModal/index';
import { TemplateModal } from '../../../ConfigurationScreen/TemplateTable/TemplateModal/index';
import { MessageLoadModal } from './MessageLoadModal/index';
import { MessageModal } from './MessageModal/index';
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

import { CategoryModal } from '../../../ConfigurationScreen/CategoryConfiguration/CategoryModal/CategoryModal';
import { TemplateModal } from '../../../ConfigurationScreen/TemplateConfiguration/TemplateModal/TemplateModal';
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

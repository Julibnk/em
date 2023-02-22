import { createContext, useContext } from 'react';
import { Nullable } from '../../core/Shared/Nullable';
// import { TemplateMessageRepository } from '../../core/TemplateMessage/TemplateMessageRepository';
import { ContactRepository } from '../../core/Contact/ContactRepository';

interface ContactScreenContext {
  contactRepository: Nullable<ContactRepository>;
}

export interface Props {
  contactRepository: ContactRepository;
  children: React.ReactNode;
}

const ContactScreenContext = createContext<ContactScreenContext>({
  contactRepository: null,
});

export const ContactScreenProvider = ({
  contactRepository,
  children,
}: Props) => {
  return (
    <ContactScreenContext.Provider value={{ contactRepository }}>
      {children}
    </ContactScreenContext.Provider>
  );
};

export const useContactScreenContext = () => {
  const { contactRepository } = useContext(ContactScreenContext);

  if (!contactRepository) {
    throw new Error('Contact repository is not defined');
  }

  return { contactRepository };
};

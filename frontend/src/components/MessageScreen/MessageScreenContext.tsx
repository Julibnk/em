import { createContext, useContext } from 'react';
import { Nullable } from '../../core/Shared/Nullable';
import { TemplateMessageRepository } from '../../core/TemplateMessage/TemplateMessageRepository';

interface MessageScreenContext {
  templateMessageRepository: Nullable<TemplateMessageRepository>;
}

export interface Props {
  templateMessageRepository: TemplateMessageRepository;
  children: React.ReactNode;
}

const MessageScreenContext = createContext<MessageScreenContext>({
  templateMessageRepository: null,
});

export const MessageScreenProvider = ({
  templateMessageRepository,
  children,
}: Props) => {
  return (
    <MessageScreenContext.Provider value={{ templateMessageRepository }}>
      {children}
    </MessageScreenContext.Provider>
  );
};

export const useMessageScreenContext = () => {
  const { templateMessageRepository } = useContext(MessageScreenContext);

  if (!templateMessageRepository) {
    throw new Error('Template message repository is not defined');
  }

  return { templateMessageRepository };
};

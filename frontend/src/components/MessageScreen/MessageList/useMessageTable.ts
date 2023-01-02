import { useState, useCallback } from 'react';
import { useMessageScreenContext } from '../MessageScreenContext';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';

export function useMessageTable() {
  const { templateMessageRepository } = useMessageScreenContext();

  const [messages, setMessages] = useState<TemplateMessage[]>([]);

  const loadMessages = useCallback(async () => {
    const messages = await templateMessageRepository.search();
    setMessages(messages);
  }, [templateMessageRepository]);

  return {
    messages,
    loadMessages,
  };
}

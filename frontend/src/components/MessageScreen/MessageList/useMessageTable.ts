import { useState, useCallback } from 'react';
import { useMessageScreenContext } from '../MessageScreenContext';
import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';

export function useMessageTable() {
  const { templateMessageRepository } = useMessageScreenContext();

  const [messages, setMessages] = useState<TemplateMessage[]>([]);

  const loadMessages = useCallback(async () => {
    // const templates = await templateMessageRepository.searchAll();
    setMessages([]);
  }, [templateMessageRepository]);

  return {
    messages,
    loadMessages,
  };
}

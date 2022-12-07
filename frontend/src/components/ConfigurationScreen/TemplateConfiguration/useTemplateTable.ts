import { useState, useCallback } from 'react';
import { Template, TemplateRepository } from '../../../Template/Template';

export function useTemplateTable(repository: TemplateRepository) {
  const [templates, setTemplates] = useState<Template[]>([]);

  const loadTemplates = useCallback(async () => {
    const templates = await repository.searchAll();
    setTemplates(templates);
  }, [repository]);

  return {
    templates,
    loadTemplates,
  };
}

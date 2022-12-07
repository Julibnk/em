import { useState, useCallback } from 'react';
import { Template } from '../../../core/Template/Template';
import { TemplateRepository } from '../../../core/Template/TemplateRepository';

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

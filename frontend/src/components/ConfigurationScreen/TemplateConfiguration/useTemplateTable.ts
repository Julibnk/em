import { useState, useCallback } from 'react';
import { Template } from '../../../core/Template/Template';
import { useConfigurationScreenContext } from '../ConfigurationScreenContext';

export function useTemplateTable() {
  const { templateRepository } = useConfigurationScreenContext();

  const [templates, setTemplates] = useState<Template[]>([]);

  const loadTemplates = useCallback(async () => {
    const templates = await templateRepository.searchAll();
    setTemplates(templates);
  }, [templateRepository]);

  return {
    templates,
    loadTemplates,
  };
}

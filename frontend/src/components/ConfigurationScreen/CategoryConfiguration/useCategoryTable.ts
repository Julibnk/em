import { useState, useCallback } from 'react';
import { Category } from '../../../core/Category/Category';
import { useConfigurationScreenContext } from '../ConfigurationScreenContext';

export function useCategoryTable() {
  const { categoryRepository: repository } = useConfigurationScreenContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    const categories = await repository.searchAll();
    setCategories(categories);
    setLoading(false);
  }, [repository]);

  return {
    categories,
    loadCategories,
    loading,
  };
}

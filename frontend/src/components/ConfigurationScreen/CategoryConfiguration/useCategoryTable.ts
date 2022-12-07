import { useState, useCallback } from 'react';
import { Category } from '../../../core/Category/Category';
import { CategoryRepository } from '../../../core/Category/CategoryRepository';

export function useCategoryTable(repository: CategoryRepository) {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = useCallback(async () => {
    const categories = await repository.searchAll();
    setCategories(categories);
  }, [repository]);

  return {
    categories,
    loadCategories,
  };
}

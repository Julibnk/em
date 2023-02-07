import { createContext, useContext } from 'react';
import { CategoryRepository } from '../../core/Category/CategoryRepository';
import { Nullable } from '../../core/Shared/Nullable';
import { TemplateRepository } from '../../core/Template/TemplateRepository';

interface ConfigurationScreenContext {
  templateRepository: Nullable<TemplateRepository>;
  categoryRepository: Nullable<CategoryRepository>;
}

export interface Props {
  templateRepository: TemplateRepository;
  categoryRepository: CategoryRepository;
  children: React.ReactNode;
}

const ConfigurationScreenContext = createContext<ConfigurationScreenContext>({
  templateRepository: null,
  categoryRepository: null,
});

export const ConfigurationScreenProvider = ({
  templateRepository,
  categoryRepository,
  children,
}: Props) => {
  return (
    <ConfigurationScreenContext.Provider
      value={{ templateRepository, categoryRepository }}
    >
      {children}
    </ConfigurationScreenContext.Provider>
  );
};

export const useConfigurationScreenContext = () => {
  const { categoryRepository, templateRepository } = useContext(
    ConfigurationScreenContext
  );

  if (!categoryRepository) {
    throw new Error('Category repository is not defined');
  }

  if (!templateRepository) {
    throw new Error('Template repository is not defined');
  }

  return { templateRepository, categoryRepository };
};

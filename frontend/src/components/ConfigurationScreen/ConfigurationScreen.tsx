import { ConfigurationTabs } from './ConfigurationTabs';
import { RestTemplateRepository } from '../../core/Template/RestTemplateRepository';
import { RestCategoryRespository } from '../../core/Category/RestCategoryRepository';
import { ConfigurationScreenProvider } from './ConfigurationScreenProvider';

const categoryRepository = RestCategoryRespository.create();
const templateRepository = RestTemplateRepository.create();

const ConfigurationScreen = () => {
  return (
    <ConfigurationScreenProvider
      categoryRepository={categoryRepository}
      templateRepository={templateRepository}
    >
      <ConfigurationTabs />
    </ConfigurationScreenProvider>
  );
};

export default ConfigurationScreen;

import { ConfigurationTabs } from './ConfigurationTabs';
import { FetchRestClient } from '../../core/RestClient/FetchRestClient';
import { RestTemplateRepository } from '../../core/Template/RestTemplateRepository';
import { RestCategoryRespository } from '../../core/Category/RestCategoryRepository';
import { ConfigurationScreenProvider } from './ConfigurationScreenContext';

const client = new FetchRestClient();

const categoryRepository = new RestCategoryRespository(client);
const templateRepository = new RestTemplateRepository(client);

const ConfigurationScreen = () => {
  return (
    <ConfigurationScreenProvider
      categoryRepository={categoryRepository}
      templateRepository={templateRepository}
    >
      <ConfigurationTabs></ConfigurationTabs>
    </ConfigurationScreenProvider>
  );
};

export default ConfigurationScreen;

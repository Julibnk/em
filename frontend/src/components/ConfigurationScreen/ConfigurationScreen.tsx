import { ConfigurationTabs } from './ConfigurationTabs';
import { FetchRestClient } from '../../core/Shared/RestClient/FetchRestClient';
import { RestTemplateRepository } from '../../core/Template/RestTemplateRepository';
import { RestCategoryRespository } from '../../core/Category/RestCategoryRepository';
import { ConfigurationScreenProvider } from './ConfigurationScreenProvider';

const client = new FetchRestClient();

const categoryRepository = new RestCategoryRespository(client);
const templateRepository = new RestTemplateRepository(client);

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

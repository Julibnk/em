import { ConfigurationTabs } from '../../../src/components/ConfigurationScreen/ConfigurationTabs';
import { render, screen } from '../../test-utils';

import { MockTemplateRepository } from '../../core/Template/__mocks__/MockTemplateRepository';
import { MockCategoryRepository } from '../../core/Category/__mocks__/MockCategoryRepository';
import { ConfigurationScreenProvider } from '../../../src/components/ConfigurationScreen/ConfigurationScreenContext';
import { TemplateRepository } from '../../../src/core/Template/TemplateRepository';
import { CategoryRepository } from '../../../src/core/Category/CategoryRepository';

let templateRepository: TemplateRepository;
let categoryRepository: CategoryRepository;

describe('ConfigurationTabs Tabs', () => {
  beforeEach(() => {
    templateRepository = new MockTemplateRepository();
    categoryRepository = new MockCategoryRepository();
  });

  it('Should render configuration tabs', async () => {
    render(
      <ConfigurationScreenProvider
        categoryRepository={categoryRepository}
        templateRepository={templateRepository}
      >
        <ConfigurationTabs />
      </ConfigurationScreenProvider>
    );

    const tabs = await screen.findByRole('tablist');
    expect(tabs).toBeInTheDocument();
  });
});

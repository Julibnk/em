import { render, screen } from '../../../test-utils';

import { TemplateConfiguration } from '../../../../src/components/ConfigurationScreen/TemplateConfiguration/TemplateConfiguration';
import { TemplateRepository } from '../../../../src/core/Template/TemplateRepository';
import { CategoryRepository } from '../../../../src/core/Category/CategoryRepository';
import { MockTemplateRepository } from '../../../core/Template/__mocks__/MockTemplateRepository';
import { MockCategoryRepository } from '../../../core/Category/__mocks__/MockCategoryRepository';
import { ConfigurationScreenProvider } from '../../../../src/components/ConfigurationScreen/ConfigurationScreenContext';

let templateRepository: TemplateRepository;
let categoryRepository: CategoryRepository;

describe('TemplateConfiguration Tabs', () => {
  beforeEach(() => {
    templateRepository = new MockTemplateRepository();
    categoryRepository = new MockCategoryRepository();
  });
  it('Should render category configuration by default', async () => {
    render(
      <ConfigurationScreenProvider
        categoryRepository={categoryRepository}
        templateRepository={templateRepository}
      >
        <TemplateConfiguration />
      </ConfigurationScreenProvider>
    );

    const a = await screen.findByRole('button');
    expect(a).toBeInTheDocument();
  });
});

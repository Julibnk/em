import { render, screen, userEvent } from '../../../test-utils';

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
  it('Should open modal when pushing add button', async () => {
    render(
      <ConfigurationScreenProvider
        categoryRepository={categoryRepository}
        templateRepository={templateRepository}
      >
        <TemplateConfiguration />
      </ConfigurationScreenProvider>
    );

    const addButton = await screen.findByRole('button', { name: /añadir/i });
    expect(addButton).toBeInTheDocument();

    userEvent.click(addButton);

    const createTemplateModal = await screen.findByRole('dialog');

    expect(createTemplateModal).toBeInTheDocument();
  });
});

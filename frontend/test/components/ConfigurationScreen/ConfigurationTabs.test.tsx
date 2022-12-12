import { ConfigurationTabs } from '../../../src/components/ConfigurationScreen/ConfigurationTabs';
import { render, screen, userEvent } from '../../test-utils';

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

    const tablist = await screen.findByRole('tablist');
    expect(tablist).toBeInTheDocument();
  });

  it('Should have two tabs', async () => {
    render(
      <ConfigurationScreenProvider
        categoryRepository={categoryRepository}
        templateRepository={templateRepository}
      >
        <ConfigurationTabs />
      </ConfigurationScreenProvider>
    );

    const tabs = await screen.findAllByRole('tab');
    expect(tabs.length).toBe(2);
  });

  it('Category tab should be default', async () => {
    render(
      <ConfigurationScreenProvider
        categoryRepository={categoryRepository}
        templateRepository={templateRepository}
      >
        <ConfigurationTabs />
      </ConfigurationScreenProvider>
    );

    const categoryTab = await screen.findByRole('tab', { name: /categorías/i });
    expect(categoryTab).toHaveAttribute('aria-selected', 'true');

    const categoryPanel = await screen.findByRole('tabpanel', {
      name: /categorías/i,
    });
    expect(categoryPanel).toBeInTheDocument();
  });

  it('Should render template panel after user changes tabs', async () => {
    render(
      <ConfigurationScreenProvider
        categoryRepository={categoryRepository}
        templateRepository={templateRepository}
      >
        <ConfigurationTabs />
      </ConfigurationScreenProvider>
    );

    const templateTab = await screen.findByRole('tab', { name: /plantillas/i });
    await userEvent.click(templateTab);

    expect(templateTab).toHaveAttribute('aria-selected', 'true');

    const categoryPanel = await screen.findByRole('tabpanel', {
      name: /plantillas/i,
    });
    expect(categoryPanel).toBeInTheDocument();
  });
});
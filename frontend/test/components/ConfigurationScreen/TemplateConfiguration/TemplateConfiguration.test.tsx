import { render, screen, userEvent } from '../../../test-utils';
import { TemplateConfiguration } from '../../../../src/components/ConfigurationScreen/TemplateConfiguration/TemplateConfiguration';
import { MockTemplateRepository } from '../../../core/Template/__mocks__/MockTemplateRepository';
import { MockCategoryRepository } from '../../../core/Category/__mocks__/MockCategoryRepository';
import { ConfigurationScreenProvider } from '../../../../src/components/ConfigurationScreen/ConfigurationScreenContext';

let templateRepository: MockTemplateRepository;
let categoryRepository: MockCategoryRepository;

describe('TemplateConfiguration Tabs', () => {
  beforeEach(() => {
    templateRepository = new MockTemplateRepository();
    categoryRepository = new MockCategoryRepository();
  });

  // it('Should be accesible', async () => {
  //   const { container } = render(
  //     <ConfigurationScreenProvider
  //       categoryRepository={categoryRepository}
  //       templateRepository={templateRepository}
  //     >
  //       <TemplateConfiguration />
  //     </ConfigurationScreenProvider>
  //   );
  //   const results = await axe(container);

  //   expect(results).toHaveNoViolations();
  //   // ).toBeInTheDocument();
  // });

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
  it('Search all templates must be called', async () => {
    render(
      <ConfigurationScreenProvider
        categoryRepository={categoryRepository}
        templateRepository={templateRepository}
      >
        <TemplateConfiguration />
      </ConfigurationScreenProvider>
    );

    expect(templateRepository.mockSearchAll).toHaveBeenCalled();
  });
});

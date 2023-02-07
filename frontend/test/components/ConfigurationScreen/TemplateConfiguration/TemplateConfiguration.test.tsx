import { render, screen, userEvent } from '../../../test-utils';
import { TemplateConfiguration } from '../../../../src/components/ConfigurationScreen/TemplateConfiguration/TemplateConfiguration';
import { MockTemplateRepository } from '../../../core/Template/__mocks__/MockTemplateRepository';
import { MockCategoryRepository } from '../../../core/Category/__mocks__/MockCategoryRepository';
import { ConfigurationScreenProvider } from '../../../../src/components/ConfigurationScreen/ConfigurationScreenProvider';

let templateRepository: MockTemplateRepository;
let categoryRepository: MockCategoryRepository;

const customRender = (ui: React.ReactElement) => {
  return render(
    <ConfigurationScreenProvider
      categoryRepository={categoryRepository}
      templateRepository={templateRepository}
    >
      {ui}
    </ConfigurationScreenProvider>
  );
};

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
    customRender(<TemplateConfiguration />);

    const addButton = await screen.findByRole('button', { name: /añadir/i });
    expect(addButton).toBeInTheDocument();

    userEvent.click(addButton);

    const createTemplateModal = await screen.findByRole('dialog');

    expect(createTemplateModal).toBeInTheDocument();
  });
  it('Search all templates must be called', async () => {
    customRender(<TemplateConfiguration />);

    expect(templateRepository.mockSearchAll).toHaveBeenCalled();
  });
});

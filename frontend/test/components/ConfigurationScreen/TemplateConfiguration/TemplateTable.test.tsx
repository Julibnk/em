import { ConfigurationScreenProvider } from '../../../../src/components/ConfigurationScreen/ConfigurationScreenContext';
import { MockCategoryRepository } from '../../../core/Category/__mocks__/MockCategoryRepository';
import { MockTemplateRepository } from '../../../core/Template/__mocks__/MockTemplateRepository';
import { render, screen } from '../../../test-utils';
import { TemplateConfiguration } from '../../../../src/components/ConfigurationScreen/TemplateConfiguration/TemplateConfiguration';
import { TemplateMother } from '../../../core/Template/TemplateMother';

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

describe('TemplateTable', () => {
  beforeEach(() => {
    templateRepository = new MockTemplateRepository();
    categoryRepository = new MockCategoryRepository();
  });

  it.todo('Should render all items');
  // it('Should render all items', async () => {
  //   const templates = [
  //     TemplateMother.create(),
  //     TemplateMother.create(),
  //     TemplateMother.create(),
  //   ];

  //   templateRepository.setAllTemplates(templates);

  //   customRender(<TemplateConfiguration />);

  //   const table = await screen.findByRole('table');

  //   // const tableRows = table.find('tr');

  //   // expect(tableRows).toHaveLength(templates.length);
  // });
});

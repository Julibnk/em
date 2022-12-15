import { render, screen, userEvent } from '../../../test-utils';
import { MockTemplateRepository } from '../../../core/Template/__mocks__/MockTemplateRepository';
import { MockCategoryRepository } from '../../../core/Category/__mocks__/MockCategoryRepository';
import { ConfigurationScreenProvider } from '../../../../src/components/ConfigurationScreen/ConfigurationScreenContext';
import { TemplateConfiguration } from '../../../../src/components/ConfigurationScreen/TemplateConfiguration/TemplateConfiguration';
import { TemplateMother } from '../../../core/Template/TemplateMother';
import { Uuid } from '../../../../src/core/Shared/Uuid';

vi.mock('../../../../src/core/Shared/Uuid');

let templateRepository: MockTemplateRepository;
let categoryRepository: MockCategoryRepository;

describe('TemplateModal', () => {
  beforeEach(() => {
    vi.mocked(Uuid.create).mockReset();
    templateRepository = new MockTemplateRepository();
    categoryRepository = new MockCategoryRepository();
  });

  describe('When user clicks add template button', () => {
    describe('And all fields are filled', () => {
      it('Should call save method on repository', async () => {
        const template = TemplateMother.create();

        Uuid.create = vi.fn(() => template.id);

        render(
          <ConfigurationScreenProvider
            categoryRepository={categoryRepository}
            templateRepository={templateRepository}
          >
            <TemplateConfiguration />
          </ConfigurationScreenProvider>
        );

        const addButton = await screen.findByRole('button', {
          name: /añadir/i,
        });
        await userEvent.click(addButton);

        const nameInput = await screen.findByLabelText(/nombre/i);
        const descriptionInput = await screen.findByLabelText(/descripción/i);
        const previewInput = await screen.findByLabelText(/vista previa/i);
        const variable1Input = await screen.findByLabelText(/variable 1/i);
        const variable2Input = await screen.findByLabelText(/variable 2/i);
        const variable3Input = await screen.findByLabelText(/variable 3/i);

        await userEvent.type(nameInput, template.name);
        await userEvent.type(descriptionInput, template.description);
        await userEvent.type(previewInput, template.preview);
        await userEvent.type(variable1Input, template.variable1);
        await userEvent.type(variable2Input, template.variable2);
        await userEvent.type(variable3Input, template.variable3);

        const submitButton = await screen.getByRole('submit');
        await userEvent.click(submitButton);

        expect(templateRepository.mockSave).toHaveBeenCalledWith(template);
      });
    });

    describe('And all fields are empty', () => {
      it('Should show two alerts', async () => {
        render(
          <ConfigurationScreenProvider
            categoryRepository={categoryRepository}
            templateRepository={templateRepository}
          >
            <TemplateConfiguration />
          </ConfigurationScreenProvider>
        );

        const addButton = await screen.findByRole('button', {
          name: /añadir/i,
        });
        await userEvent.click(addButton);

        const submitButton = await screen.getByRole('submit');
        await userEvent.click(submitButton);

        const alerts = await screen.getAllByRole('alert');

        //Tiene un alert que siempre se muestra
        expect(alerts.length).toBe(2);
      });
    });

    describe('And name is empty', () => {
      it('Should show error message', async () => {
        render(
          <ConfigurationScreenProvider
            categoryRepository={categoryRepository}
            templateRepository={templateRepository}
          >
            <TemplateConfiguration />
          </ConfigurationScreenProvider>
        );

        const addButton = await screen.findByRole('button', {
          name: /añadir/i,
        });
        await userEvent.click(addButton);

        const submitButton = await screen.getByRole('submit');
        await userEvent.click(submitButton);

        //Tiene un alert que siempre se muestra
        expect(
          await screen.findByText(/el nombre de la plantilla es obligatorio/i)
        ).toBeInTheDocument();
      });
    });

    describe('And variable 3 is defined but variables 1 and 2 are empty', () => {
      it('Should show error message', async () => {
        const template = TemplateMother.create();

        render(
          <ConfigurationScreenProvider
            categoryRepository={categoryRepository}
            templateRepository={templateRepository}
          >
            <TemplateConfiguration />
          </ConfigurationScreenProvider>
        );

        const addButton = await screen.findByRole('button', {
          name: /añadir/i,
        });
        await userEvent.click(addButton);
        const variable3Input = await screen.findByLabelText(/variable 3/i);

        await userEvent.type(variable3Input, template.variable3);

        const submitButton = await screen.getByRole('submit');
        await userEvent.click(submitButton);

        //Tiene un alert que siempre se muestra
        expect(
          await screen.findByText(
            /las variables deben de estar definidas en orden/i
          )
        ).toBeInTheDocument();
      });
    });
    describe('And variable 2 is defined but variable1 is empty', () => {
      it('Should show error message', async () => {
        const template = TemplateMother.create();

        render(
          <ConfigurationScreenProvider
            categoryRepository={categoryRepository}
            templateRepository={templateRepository}
          >
            <TemplateConfiguration />
          </ConfigurationScreenProvider>
        );

        const addButton = await screen.findByRole('button', {
          name: /añadir/i,
        });
        await userEvent.click(addButton);
        const variable2Input = await screen.findByLabelText(/variable 2/i);

        await userEvent.type(variable2Input, template.variable3);

        const submitButton = await screen.getByRole('submit');
        await userEvent.click(submitButton);

        //Tiene un alert que siempre se muestra
        expect(
          await screen.findByText(
            /las variables deben de estar definidas en orden/i
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe('When user edits a template', () => {
    it('Find by id must be called', async () => {
      const templates = [
        TemplateMother.create(),
        TemplateMother.create(),
        TemplateMother.create(),
      ];

      const template = templates[1];

      templateRepository.setAllTemplates(templates);
      templateRepository.setTemplateById(template);

      render(
        <ConfigurationScreenProvider
          categoryRepository={categoryRepository}
          templateRepository={templateRepository}
        >
          <TemplateConfiguration />
        </ConfigurationScreenProvider>
      );

      const allEditButtons = await screen.findAllByRole('button', {
        name: /editar plantilla/i,
      });

      await userEvent.click(allEditButtons[1]);

      expect(templateRepository.mockSearchById).toHaveBeenCalledWith(
        template.id
      );
    });
    it('Modal should opened with template values', async () => {
      const templates = [
        TemplateMother.create(),
        TemplateMother.create(),
        TemplateMother.create(),
      ];

      const template = templates[1];

      templateRepository.setAllTemplates(templates);
      templateRepository.setTemplateById(template);

      render(
        <ConfigurationScreenProvider
          categoryRepository={categoryRepository}
          templateRepository={templateRepository}
        >
          <TemplateConfiguration />
        </ConfigurationScreenProvider>
      );

      const allEditButtons = await screen.findAllByRole('button', {
        name: /editar plantilla/i,
      });

      await userEvent.click(allEditButtons[1]);

      const nameInput = await screen.findByLabelText(/nombre/i);
      const descriptionInput = await screen.findByLabelText(/descripción/i);
      const previewInput = await screen.findByLabelText(/vista previa/i);
      const variable1Input = await screen.findByLabelText(/variable 1/i);
      const variable2Input = await screen.findByLabelText(/variable 2/i);
      const variable3Input = await screen.findByLabelText(/variable 3/i);

      expect(nameInput).toHaveValue(template.name);
      expect(descriptionInput).toHaveValue(template.description);
      expect(previewInput).toHaveValue(template.preview);
      expect(variable1Input).toHaveValue(template.variable1);
      expect(variable2Input).toHaveValue(template.variable2);
      expect(variable3Input).toHaveValue(template.variable3);
    });
  });
});

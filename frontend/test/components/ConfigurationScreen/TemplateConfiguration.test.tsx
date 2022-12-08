import { ConfigurationTabs } from '../../../src/components/ConfigurationScreen/ConfigurationTabs';
import { render, screen } from '../../test-utils';

// import { TemplateConfiguration } from '../../../../src/components/ConfigurationScreen/TemplateConfiguration/TemplateConfiguration';

describe('ConfigurationTabs Tabs', () => {
  it('Should render configuration tabs', async () => {
    // render(<div></div>);
    // const a = 'Si sale es mal';
    // console.log(a);
    render(<ConfigurationTabs />);

    // const tabs = await screen.findByRole('tablist');
    // expect(tabs).toBeInTheDocument();
  });
});

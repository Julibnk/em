import { ConfigurationTabs } from '../../../../src/components/ConfigurationScreen/ConfigurationTabs';
import { render, screen } from '../../../test-utils';

import { TemplateConfiguration } from '../../../../src/components/ConfigurationScreen/TemplateConfiguration/TemplateConfiguration';

describe('TemplateConfiguration Tabs', () => {
  it('Should render category configuration by default', async () => {
    // render(<div></div>);
    // const a = 'Si sale es mal';
    // console.log(a);
    render(<TemplateConfiguration />);

    // const tabs = await screen.findByRole('tablist');
    // expect(tabs).toBeInTheDocument();
  });
});

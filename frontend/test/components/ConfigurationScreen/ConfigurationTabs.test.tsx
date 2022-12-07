import { ConfigurationTabs } from '../../../src/components/ConfigurationScreen/ConfigurationTabs';
import ConfigurationScreen from '../../../src/components/ConfigurationScreen/ConfigurationScreen';
import { render, screen } from '../../..//utils/test-utils';
// import render from '../../../test-utils';

describe('Configuration Tabs', () => {
  it('Should render category configuration by default', async () => {
    // render(<div></div>);
    // const a = 'Si sale es mal';
    // console.log(a);
    render(<ConfigurationTabs />);

    const tabs = await screen.findByRole('tablist');
    expect(tabs).toBeInTheDocument();
  });
});

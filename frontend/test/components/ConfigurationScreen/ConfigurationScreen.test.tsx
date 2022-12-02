import ConfigurationScreen from '../../../src/components/ConfigurationScreen/index';
import { render, screen } from '../../..//utils/test-utils';
// import render from '../../../test-utils';

describe('Configuration Screen', () => {
  it('should do somethig', async () => {
    // render(<div></div>);
    // const a = 'Si sale es mal';
    // console.log(a);
    render(<ConfigurationScreen />);

    const tabs = await screen.findByRole('tablist');
    expect(tabs).toBeInTheDocument();
  });
});

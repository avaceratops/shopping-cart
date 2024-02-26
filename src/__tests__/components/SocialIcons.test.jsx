import { render } from '@testing-library/react';
import SocialIcons from '../../components/SocialIcons';

it('renders social icons correctly', () => {
  const { container } = render(<SocialIcons />);
  expect(container).toMatchSnapshot();
});

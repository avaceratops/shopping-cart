import { render } from '@testing-library/react';
import ErrorMessage from '../../components/ErrorMessage';

it('renders 404 message correctly', () => {
  const { container } = render(<ErrorMessage />);
  expect(container).toMatchSnapshot();
});

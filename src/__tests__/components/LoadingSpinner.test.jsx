import { render } from '@testing-library/react';
import LoadingSpinner from '../../components/LoadingSpinner';

it('renders loading spinner correctly', () => {
  const { container } = render(<LoadingSpinner />);
  expect(container).toMatchSnapshot();
});

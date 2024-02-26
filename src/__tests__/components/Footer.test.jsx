import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Footer from '../../components/Footer';

it('renders footer correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

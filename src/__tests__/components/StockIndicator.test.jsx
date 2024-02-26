import { render, screen } from '@testing-library/react';
import StockIndicator from '../../components/StockIndicator';

it('renders correctly when stock is 0', () => {
  render(<StockIndicator stock={0} />);

  expect(screen.queryByText(/in stock/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Out of stock/i)).toBeInTheDocument();
});

it('renders correctly when stock > 0', () => {
  render(<StockIndicator stock={5} />);

  expect(screen.getByText(/in stock/i)).toBeInTheDocument();
  expect(screen.queryByText(/Out of stock/i)).not.toBeInTheDocument();
});

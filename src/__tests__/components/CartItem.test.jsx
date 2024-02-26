import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItem from '../../components/CartItem';

const product = {
  id: '00001',
  name: 'Norn Emissary',
  price: 7000,
  faction: 'Tyranids',
  image:
    '/images/warhammer-40k/https___trade.games-workshop.com_assets_2023_08_99120106064_NornAssimilatorStock.jpg',
  sku: 99120106064,
  stock: 10,
  sold: 48,
};

it('renders cart item correctly', () => {
  const { container } = render(<CartItem product={product} />);
  expect(container).toMatchSnapshot();
});

it('calls removeFromCart correctly when "Remove" button is clicked', async () => {
  const removeFromCart = vi.fn();
  const user = userEvent.setup();
  render(<CartItem product={product} removeFromCart={removeFromCart} />);

  const removeButton = screen.getByRole('button', { name: /remove/i });
  await user.click(removeButton);

  expect(removeFromCart).toHaveBeenCalledWith('00001');
});

import { vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProductButton from '../../components/AddProductButton';

it('renders "Add to cart" button when stock > 0', () => {
  render(<AddProductButton stock={5} />);

  const addButton = screen.queryByRole('button', { name: /add to cart/i });
  const soldOutButton = screen.queryByRole('button', { name: /sold out/i });

  expect(addButton).toBeInTheDocument();
  expect(soldOutButton).not.toBeInTheDocument();
});

it('renders "Sold out" button when stock === 0', () => {
  render(<AddProductButton stock={0} />);

  const addButton = screen.queryByRole('button', { name: /add to cart/i });
  const soldOutButton = screen.queryByRole('button', { name: /sold out/i });

  expect(addButton).not.toBeInTheDocument();
  expect(soldOutButton).toBeInTheDocument();
  expect(soldOutButton).toBeDisabled();
});

it('clicking "Add to cart" button calls onClick', async () => {
  const addToCart = vi.fn();
  const user = userEvent.setup();
  render(<AddProductButton stock={5} addToCart={addToCart} />);

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);

  expect(addToCart).toHaveBeenCalled();
});

it('clicking "Sold out" button does nothing', async () => {
  const addToCart = vi.fn();
  const user = userEvent.setup();
  render(<AddProductButton stock={0} addToCart={addToCart} />);

  const button = screen.getByRole('button', { name: /sold out/i });
  await user.click(button);

  expect(addToCart).not.toHaveBeenCalled();
});

it('displays "Added" when item is successfully added', async () => {
  const addToCart = vi.fn().mockReturnValueOnce(true);
  const user = userEvent.setup();
  render(<AddProductButton stock={5} addToCart={addToCart} />);

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);
  const addedButton = await screen.findByRole('button', { name: /added/i });

  expect(addedButton).toBeInTheDocument();
});

it('displays "Out of stock" when trying to add more than available stock', async () => {
  const addToCart = vi.fn().mockReturnValue(false).mockReturnValueOnce(true);
  const user = userEvent.setup();
  vi.useFakeTimers({ shouldAdvanceTime: true });
  render(<AddProductButton stock={1} addToCart={addToCart} />);

  let button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);
  act(() => {
    vi.advanceTimersByTime(3000);
  });
  await user.click(button);
  const stockButton = await screen.findByRole('button', { name: /not enough stock/i });

  expect(stockButton).toBeInTheDocument();
});

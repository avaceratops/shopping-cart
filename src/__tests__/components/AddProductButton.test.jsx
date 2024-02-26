import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<AddProductButton stock={5} onClick={onClick} />);

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);

  expect(onClick).toHaveBeenCalled();
});

it('clicking "Sold out" button does nothing', async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<AddProductButton stock={0} onClick={onClick} />);

  const button = screen.getByRole('button', { name: /sold out/i });
  await user.click(button);

  expect(onClick).not.toHaveBeenCalled();
});

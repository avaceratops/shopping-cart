import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartButton from '../../components/CartButton';

it('renders button with correct quantity', () => {
  render(<CartButton totalQuantity={5} />);

  const button = screen.getByRole('button', { name: /cart 5/i });

  expect(button).toBeInTheDocument();
});

it('calls onClick handler when button is clicked', async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<CartButton onClick={onClick} />);

  const button = screen.getByRole('button', { name: /cart/i });
  await user.click(button);

  expect(onClick).toHaveBeenCalled();
});

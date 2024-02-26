import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartDialog from '../../components/CartDialog';

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

it('renders cart button with dialog initially hidden', () => {
  render(<CartDialog cart={[]} />);

  const cartButton = screen.getByRole('button', { name: /cart/i });
  const dialogHeading = screen.queryByRole('heading', { name: /shopping cart/i });

  expect(cartButton).toBeInTheDocument();
  expect(dialogHeading).not.toBeInTheDocument();
});

it('opens dialog when cart button is clicked', async () => {
  const user = userEvent.setup();
  render(<CartDialog cart={[]} />);

  const button = screen.getByRole('button', { name: /cart/i });
  await user.click(button);
  const closeButton = screen.getByRole('button', { name: /close panel/i });

  expect(closeButton).toBeInTheDocument();
});

it('closes dialog when "X" button is clicked', async () => {
  const user = userEvent.setup();
  render(<CartDialog cart={[]} />);

  const openButton = screen.getByRole('button', { name: /cart/i });
  await user.click(openButton);
  const closeButton = screen.getByRole('button', { name: /close panel/i });
  await user.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByRole('button', { name: /close panel/i })).not.toBeInTheDocument();
  });
});

it('displays correct cart quantity when cart is empty', () => {
  render(<CartDialog cart={[]} />);

  const cartButton = screen.getByRole('button', { name: /cart 0/i });

  expect(cartButton).toBeInTheDocument();
});

it('displays correct cart quantity when cart is not empty', () => {
  const cart = [
    { product: { id: '1' }, quantity: 2 },
    { product: { id: '2' }, quantity: 3 },
    { product: { id: '3' }, quantity: 1 },
  ];
  render(<CartDialog cart={cart} />);

  const cartButton = screen.getByRole('button', { name: /cart 6/i });

  expect(cartButton).toBeInTheDocument();
});

it('displays correct cart subtotal when cart is empty', async () => {
  const user = userEvent.setup();
  render(<CartDialog cart={[]} />);

  const button = screen.getByRole('button', { name: /cart/i });
  await user.click(button);
  const subtotalElement = screen.getByText(/£0\.00/i);

  expect(subtotalElement).toBeInTheDocument();
});

it('displays correct cart subtotal when cart is not empty', async () => {
  const user = userEvent.setup();
  const cart = [
    { product: { id: '1', price: 10000 }, quantity: 2 },
    { product: { id: '2', price: 4250 }, quantity: 3 },
    { product: { id: '3', price: 5000 }, quantity: 1 },
  ];
  render(<CartDialog cart={cart} />);

  const button = screen.getByRole('button', { name: /cart/i });
  await user.click(button);
  const subtotalElement = screen.getByText(/£377\.50/i);

  expect(subtotalElement).toBeInTheDocument();
});

it('renders cart items correctly', async () => {
  const user = userEvent.setup();
  render(
    <CartDialog
      cart={[
        { product: { id: '1', name: 'Norn Emissary' }, quantity: 1 },
        { product: { id: '2', name: 'Angron' }, quantity: 1 },
      ]}
    />
  );

  const button = screen.getByRole('button', { name: /cart/i });
  await user.click(button);
  const firstProduct = screen.getByRole('heading', { name: /norn emissary/i });
  const secondProduct = screen.getByRole('heading', { name: /angron/i });

  expect(firstProduct).toBeInTheDocument();
  expect(secondProduct).toBeInTheDocument();
});

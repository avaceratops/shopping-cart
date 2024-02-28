import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { NAVIGATION_LINKS } from '../../utils/navigation';
import Header from '../../components/Header';

const updateCartItem = vi.fn();
const removeFromCart = vi.fn();
const clearCart = vi.fn();

it('renders header correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Header
        cart={[]}
        updateCartItem={updateCartItem}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();
});

it('renders all navigation links correctly', () => {
  render(
    <BrowserRouter>
      <Header
        cart={[]}
        updateCartItem={updateCartItem}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </BrowserRouter>
  );

  NAVIGATION_LINKS.filter((item) => item.name !== 'Home').forEach((item) => {
    expect(screen.getByRole('link', { name: item.name })).toBeInTheDocument();
  });
});

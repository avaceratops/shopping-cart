import { vi } from 'vitest';
import { BrowserRouter, useOutletContext, useParams } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../../components/ProductCard';

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useOutletContext: () => ({
      addToCart: vi.fn(),
    }),
    useParams: () => ({
      game: 'warhammer-40k',
    }),
  };
});

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

it('renders product card correctly', () => {
  const { game } = useParams();
  render(
    <BrowserRouter>
      <ProductCard product={product} />
    </BrowserRouter>
  );

  expect(screen.getByRole('link')).toHaveAttribute('href', `/${game}/${product.id}`);
  expect(screen.getByRole('img')).toHaveAttribute('src', product.image + '--400.webp');
  expect(screen.getByText(`£${(product.price / 100).toFixed(2)}`)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: product.faction })).toBeInTheDocument();
  expect(screen.getByText(`${product.stock}+ in stock`)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
});

it('clicking AddProductButton calls addToCart', async () => {
  const { addToCart } = useOutletContext();
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <ProductCard product={product} />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);

  waitFor(() => {
    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product, 1);
  });
});

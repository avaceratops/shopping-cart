import { vi } from 'vitest';
import { BrowserRouter, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from '../../routes/Product';

const product = vi.hoisted(() => {
  return {
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
});

const mocks = vi.hoisted(() => {
  return {
    useNavigate: vi.fn(),
    useOutletContext: {
      data: { 'warhammer-40k': [product] },
      isLoading: false,
      addToCart: vi.fn(),
    },
    useParams: { game: 'warhammer-40k', productId: '00001' },
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNavigate: vi.fn(() => mocks.useNavigate),
    useOutletContext: vi.fn(() => mocks.useOutletContext),
    useParams: vi.fn(() => mocks.useParams),
  };
});

it('renders loading spinner when isLoading is true', () => {
  useOutletContext.mockReturnValueOnce({ ...mocks.useOutletContext, isLoading: true });
  render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  );

  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

it("doesn't render loading spinner when isLoading is false", () => {
  render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  );

  expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
});

it('renders 404 page when product cannot be found', () => {
  useParams.mockReturnValueOnce({ ...mocks.useParams, productId: '99999' });
  render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  );

  expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: product.name })).not.toBeInTheDocument();
});

it('renders product page correctly when product can be found', () => {
  render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  );

  expect(screen.queryByRole('heading', { name: /404/i })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
});

it('calls navigate when user clicks "Back" button', async () => {
  const navigate = useNavigate();
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /back/i });
  await user.click(button);

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith(-1);
});

it('calls addToCart when user clicks "Add to cart" button', async () => {
  const { addToCart } = useOutletContext();
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);

  expect(addToCart).toHaveBeenCalledTimes(1);
});

it('handleQuantityChange changes quantity correctly', async () => {
  const { addToCart } = useOutletContext();
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  );

  const combobox = screen.getByRole('combobox', { name: /quantity/i });
  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.selectOptions(combobox, '3');
  await user.click(button);

  expect(addToCart).toHaveBeenCalledWith(product, 3);
});

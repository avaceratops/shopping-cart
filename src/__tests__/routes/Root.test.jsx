import { vi } from 'vitest';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import useProductData from '../../hooks/useProductData';
import Root from '../../routes/Root';

window.scrollTo = vi.fn();

const mocks = vi.hoisted(() => {
  return {
    Header: ({ cart }) => <div data-testid="header">{`Cart length: ${cart.length}`}</div>,
    Outlet: ({ context }) => <div data-testid="outlet">{`isLoading: ${context.isLoading}`}</div>,
    Footer: () => <div data-testid="footer" />,
    useProductData: {
      data: [],
      isLoading: false,
      isError: false,
    },
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal();
  return { ...mod, Outlet: mocks.Outlet };
});

vi.mock('../../hooks/useProductData', () => ({ default: vi.fn(() => mocks.useProductData) }));
vi.mock('../../components/Header', () => ({ default: mocks.Header }));
vi.mock('../../components/Footer', () => ({ default: mocks.Footer }));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

it('renders error message when isError is true', () => {
  vi.mocked(useProductData).mockReturnValueOnce({ ...mocks.useProductData, isError: true });
  render(<RouterProvider router={router} />);

  const error = screen.getByText('Unable to load product data. Please try refreshing the page.');

  expect(error).toBeInTheDocument();
});

it('renders Header, Outlet, and Footer when isError is false', () => {
  render(<RouterProvider router={router} />);

  const header = screen.getByTestId('header');
  const outlet = screen.getByTestId('outlet');
  const footer = screen.getByTestId('footer');

  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent('Cart length: 0');
  expect(outlet).toBeInTheDocument();
  expect(outlet).toHaveTextContent('isLoading: false');
  expect(footer).toBeInTheDocument();
});

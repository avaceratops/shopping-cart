import { vi } from 'vitest';
import { MemoryRouter, useOutletContext } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Search from '../../routes/Search';

const products = vi.hoisted(() => {
  return {
    'warhammer-40k': [
      {
        id: '00001',
        name: 'Norn Emissary',
        price: 7000,
        faction: 'Tyranids',
        image:
          '/images/warhammer-40k/https___trade.games-workshop.com_assets_2023_08_99120106064_NornAssimilatorStock.jpg',
        sku: 99120106064,
        stock: 10,
        sold: 48,
      },
      {
        id: '00002',
        name: 'Commander Dante',
        price: 2750,
        faction: 'Blood Angels',
        image:
          '/images/warhammer-40k/https___trade.games-workshop.com_assets_2023_04_TR-41-40-99120101395-Blood Angels Commander Dante.jpg',
        sku: 99120101395,
        stock: 0,
        sold: 49,
      },
    ],
    'age-of-sigmar': [
      {
        id: '10001',
        name: "Be'lakor",
        price: 9500,
        faction: 'Slaves to Darkness',
        image:
          '/images/aos/https___trade.games-workshop.com_assets_2023_02_EB200a-97-19-99129915070-Belakor_The_Dark_Master',
        sku: 99129915070,
        stock: 0,
        sold: 49,
      },
      {
        id: '10002',
        name: 'Kroxigor',
        price: 3750,
        faction: 'Seraphon',
        image:
          '/images/aos/https___trade.games-workshop.com_assets_2023_05_99120208032_SERKroxigorStock',
        sku: 99120208032,
        stock: 4,
        sold: 50,
      },
    ],
  };
});

const mocks = vi.hoisted(() => {
  return {
    useNavigate: vi.fn(),
    useOutletContext: {
      data: products,
      isLoading: false,
    },
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNavigate: vi.fn(() => mocks.useNavigate),
    useOutletContext: vi.fn(() => mocks.useOutletContext),
  };
});

const combinedProducts = Object.values(products).flat();

it('renders loading spinner when isLoading is true', () => {
  useOutletContext.mockReturnValueOnce({ ...mocks.useOutletContext, isLoading: true });
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );

  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

it("doesn't render loading spinner when isLoading is false", () => {
  render(
    <MemoryRouter initialEntries={['?q=']}>
      <Search />
    </MemoryRouter>
  );

  expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
});

it('displays all products when search query is empty', () => {
  render(
    <MemoryRouter initialEntries={['?q=']}>
      <Search />
    </MemoryRouter>
  );

  combinedProducts.forEach((product) => {
    const heading = screen.getByRole('heading', { name: product.name });
    expect(heading).toBeInTheDocument();
  });
});

it("doesn't display any products when no products match search query", () => {
  render(
    <MemoryRouter initialEntries={['?q=test']}>
      <Search />
    </MemoryRouter>
  );

  combinedProducts.forEach((product) => {
    const heading = screen.queryByRole('heading', { name: product.name });
    expect(heading).not.toBeInTheDocument();
  });
});

it('displays only products which match search query by name', () => {
  render(
    <MemoryRouter initialEntries={['?q=norn']}>
      <Search />
    </MemoryRouter>
  );

  combinedProducts.forEach((product) => {
    const heading = screen.queryByRole('heading', { name: product.name });
    if (product.name === 'Norn Emissary') {
      expect(heading).toBeInTheDocument();
    } else {
      expect(heading).not.toBeInTheDocument();
    }
  });
});

it('displays only products which match search query by faction', () => {
  render(
    <MemoryRouter initialEntries={['?q=tyranids']}>
      <Search />
    </MemoryRouter>
  );

  combinedProducts.forEach((product) => {
    const heading = screen.queryByRole('heading', { name: product.name });
    if (product.faction === 'Tyranids') {
      expect(heading).toBeInTheDocument();
    } else {
      expect(heading).not.toBeInTheDocument();
    }
  });
});

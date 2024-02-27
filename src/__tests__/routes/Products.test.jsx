import { vi } from 'vitest';
import { BrowserRouter, useOutletContext, useParams } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from '../../routes/Products';
import { describe } from 'vitest';

const products = vi.hoisted(() => {
  return [
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
    {
      id: '00003',
      name: "Lion El'Jonson",
      price: 4250,
      faction: 'Dark Angels',
      image:
        '/images/warhammer-40k/https___trade.games-workshop.com_assets_2023_07_99120101378_DALionElJohnsonStock.jpg',
      sku: 99120101378,
      stock: 4,
      sold: 28,
    },
  ];
});

const mocks = vi.hoisted(() => {
  return {
    useOutletContext: {
      data: { 'warhammer-40k': products },
      isLoading: false,
    },
    useParams: { game: 'warhammer-40k' },
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useOutletContext: vi.fn(() => mocks.useOutletContext),
    useParams: vi.fn(() => mocks.useParams),
  };
});

vi.mock('../../components/Dialog', () => ({ default: ({ children }) => <div>{children}</div> }));

it('renders loading spinner when isLoading is true', () => {
  useOutletContext.mockReturnValue({ ...mocks.useOutletContext, isLoading: true });
  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );
  useOutletContext.mockRestore();

  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

it("doesn't render loading spinner when isLoading is false", () => {
  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );

  expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
});

it('renders 404 page when products cannot be found', () => {
  useParams.mockReturnValue({ ...mocks.useParams, game: 'age-of-sigmar' });
  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );
  useParams.mockRestore();

  expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: products[0].name })).not.toBeInTheDocument();
});

it('renders products correctly when products can be found', () => {
  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );

  const links = screen.getAllByRole('link');

  expect(screen.queryByRole('heading', { name: /404/i })).not.toBeInTheDocument();
  expect(links).toHaveLength(3);
  products.forEach((product) => {
    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
  });
});

describe('filters', () => {
  it('displays correct products when in-stock filter is disabled', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole('checkbox', { name: /in stock/i });
    await user.click(checkbox);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(1);
    products.forEach((product) => {
      if (product.stock > 0) {
        expect(screen.queryByRole('heading', { name: product.name })).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
      }
    });
  });

  it('displays correct products when out-of-stock filter is disabled', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole('checkbox', { name: /out of stock/i });
    await user.click(checkbox);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);
    products.forEach((product) => {
      if (product.stock === 0) {
        expect(screen.queryByRole('heading', { name: product.name })).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
      }
    });
  });

  it('displays correct products when faction filter is enabled', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const factionName = 'Tyranids';
    const checkbox = screen.getByRole('checkbox', { name: factionName });
    await user.click(checkbox);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(1);
    products.forEach((product) => {
      if (product.faction !== factionName) {
        expect(screen.queryByRole('heading', { name: product.name })).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
      }
    });
  });

  it('displays correct products when multiple faction filters are enabled', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const factionNames = ['Tyranids', 'Blood Angels'];
    const firstCheckbox = screen.getByRole('checkbox', { name: factionNames[0] });
    const secondCheckbox = screen.getByRole('checkbox', { name: factionNames[1] });
    await user.click(firstCheckbox);
    await user.click(secondCheckbox);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);
    products.forEach((product) => {
      if (product.faction !== factionNames[0] && product.faction !== factionNames[1]) {
        expect(screen.queryByRole('heading', { name: product.name })).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
      }
    });
  });
});

describe('sorting', () => {
  it('moves out-of-stock products to end of list', async () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');

    expect(within(links[2]).getByText(products[1].name)).toBeInTheDocument();
  });

  it('sorts products correctly by default order (best-selling)', async () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');

    expect(within(links[0]).getByText(products[0].name)).toBeInTheDocument();
    expect(within(links[1]).getByText(products[2].name)).toBeInTheDocument();
    expect(within(links[2]).getByText(products[1].name)).toBeInTheDocument();
  });

  it('sorts products correctly by selected order', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const combobox = screen.getByRole('combobox', { name: /sort by/i });
    await user.selectOptions(combobox, 'Alphabetically, A-Z');
    const links = screen.getAllByRole('link');

    expect(within(links[0]).getByText(products[2].name)).toBeInTheDocument();
    expect(within(links[1]).getByText(products[0].name)).toBeInTheDocument();
    expect(within(links[2]).getByText(products[1].name)).toBeInTheDocument();
  });
});

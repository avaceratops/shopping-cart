import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import {
  FACTION_NAMES,
  GAME_DESCRIPTIONS,
  getSortFunction,
  sortByAvailability,
} from '../utils/products';
import Checkbox from '../components/Checkbox';
import Collapsible from '../components/Collapsible';
import Dialog from '../components/Dialog';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import SortBy from '../components/SortBy';

export default function Products() {
  const { game } = useParams();
  const { data, isLoading } = useOutletContext();
  const gameProducts = data[game];
  const [sortMethod, setSortMethod] = useState('Best Selling');
  const [filters, setFilters] = useState({
    factions: [],
    inStock: true,
    outOfStock: true,
  });

  useEffect(() => {
    // reset selected factions filter when game changes
    setFilters((prevFilters) => ({
      ...prevFilters,
      factions: [],
    }));
  }, [game]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!gameProducts) {
    return <ErrorMessage />;
  }

  const handleFactionCheckbox = (e) => {
    const { id, checked } = e.target;
    const newFactions = checked
      ? [...filters.factions, id]
      : filters.factions.filter((factionId) => factionId !== id);
    setFilters({ ...filters, factions: newFactions });
  };

  const handleToggleCheckbox = (e) => {
    const { id, checked } = e.target;
    setFilters({ ...filters, [id]: checked });
  };

  const handleChangeSort = (e) => {
    setSortMethod(e.target.value);
  };

  const resetFilters = () => {
    setFilters({ factions: [], inStock: true, outOfStock: true });
  };

  // sequentially apply filters as these can all be used in combination
  const filteredProducts = [...gameProducts].filter((product) => {
    // show all factions unless the user has selected at least 1
    if (filters.factions.length > 0 && !filters.factions.includes(product.faction)) return false;
    if (!filters.inStock && product.stock > 0) return false;
    if (!filters.outOfStock && product.stock === 0) return false;
    return true;
  });

  const sortFunction = getSortFunction(sortMethod);
  // always move out-of-stock products to the end
  const sortedProducts = filteredProducts.sort(sortFunction).sort(sortByAvailability);
  const divider = <div className="my-4 border-b" />;

  return (
    <section className="flex flex-col gap-4">
      <section className="mb-6 hidden whitespace-pre-line rounded-lg bg-gray-100 p-6 md:block">
        <p>{GAME_DESCRIPTIONS[game]}</p>
      </section>

      <section className="flex w-full flex-col justify-between gap-4 xs:flex-row">
        <Dialog title="Filters">
          {divider}
          <section>
            <Collapsible defaultOpen={true} buttonText={'Faction'}>
              {FACTION_NAMES[game].map((faction) => (
                <Checkbox
                  key={faction}
                  id={faction}
                  label={faction}
                  checked={filters.factions.includes(faction)}
                  onChange={handleFactionCheckbox}
                />
              ))}
            </Collapsible>
            {divider}

            <Collapsible defaultOpen={true} buttonText={'Availability'}>
              <Checkbox
                id="inStock"
                label="In stock"
                checked={filters.inStock}
                onChange={handleToggleCheckbox}
              />
              <Checkbox
                id="outOfStock"
                label="Out of stock"
                checked={filters.outOfStock}
                onChange={handleToggleCheckbox}
              />
            </Collapsible>
            {divider}

            <button
              className="rounded bg-gray-500 px-8 py-2 text-sm font-bold text-white
                hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400/50"
              onClick={resetFilters}
            >
              Reset
            </button>
          </section>
        </Dialog>

        <SortBy defaultValue={sortMethod} onChange={handleChangeSort} />
      </section>

      {filteredProducts.length === 0 && (
        <section className="mt-10 grid h-32 place-content-center">
          <p className="text-2xl font-bold leading-none tracking-tight">No products found.</p>
        </section>
      )}

      <section
        className="col-start-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          xl:grid-cols-5"
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
}

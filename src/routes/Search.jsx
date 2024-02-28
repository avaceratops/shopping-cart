import { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { SORT_METHODS, getSortFunction, sortByAvailability } from '../utils/products';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Select.module.scss';

export default function Search() {
  const navigate = useNavigate();
  const { query } = useParams();
  const { data, isLoading } = useOutletContext();
  const products = Object.values(data).flatMap((products) => products);
  const [sortMethod, setSortMethod] = useState('Best Selling');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!products) {
    return <ErrorMessage />;
  }

  const handleChangeSort = (e) => {
    setSortMethod(e.target.value);
  };

  const filteredProducts = [...products].filter((product) => {
    const searchTerm = query.toLowerCase();
    const productName = product.name.toLowerCase();
    const productFaction = product.faction.toLowerCase();
    return productName.includes(searchTerm) || productFaction.includes(searchTerm);
  });

  const sortFunction = getSortFunction(sortMethod);
  // always move out-of-stock products to the end
  const sortedProducts = filteredProducts.sort(sortFunction).sort(sortByAvailability);

  return (
    <section className="flex flex-col items-center gap-4">
      <section className="flex w-full flex-col justify-between gap-4 xs:flex-row">
        <button
          className="mb-4 rounded bg-gray-500 px-8 py-2 text-sm font-bold text-white
            hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400/50"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <label htmlFor="sort-method" className="self-center font-medium xs:self-auto">
          Sort By
          <select
            id="sort-method"
            name="sort-method"
            className={`${styles.select} ml-3`}
            onChange={handleChangeSort}
            defaultValue={sortMethod}
          >
            {Object.keys(SORT_METHODS).map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>
      </section>

      {sortedProducts.length === 0 && (
        <p className="my-14 justify-self-center text-2xl font-bold leading-none tracking-tight">
          No products found.
        </p>
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

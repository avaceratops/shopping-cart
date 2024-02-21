import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { getSortFunction, sortByAvailability } from '../utils/products';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Select.module.scss';

export default function Products() {
  const { game } = useParams();
  const { data, isLoading } = useOutletContext();
  const [sortMethod, setSortMethod] = useState('best-selling');
  const gameProducts = data[game];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!gameProducts) {
    return <ErrorMessage />;
  }

  const handleChange = (e) => {
    setSortMethod(e.target.value);
  };

  const sortFunction = getSortFunction(sortMethod);
  // always move out-of-stock products to the end
  const sortedProducts = [...gameProducts].sort(sortFunction).sort(sortByAvailability);

  return (
    <>
      <section className="mb-4 flex justify-end">
        <label htmlFor="sort-method" className="font-medium">
          Sort By
          <select
            id="sort-method"
            name="sort-method"
            className={`${styles.select} ml-3`}
            onChange={handleChange}
            defaultValue={sortMethod}
          >
            <option value={'best-selling'}>Best Selling</option>
            <option value={'name-ascending'}>Alphabetically, A-Z</option>
            <option value={'name-descending'}>Alphabetically, Z-A</option>
            <option value={'price-ascending'}>Price, low to high</option>
            <option value={'price-descending'}>Price, high to low</option>
          </select>
        </label>
      </section>

      <section
        className="grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5"
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

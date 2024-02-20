import { useOutletContext, useParams } from 'react-router-dom';
import { sortByAvailability } from '../utils/products';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { game } = useParams();
  const { data, isLoading } = useOutletContext();
  const gameProducts = data[game];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!gameProducts) {
    return <ErrorMessage />;
  }

  const sortedProducts = gameProducts.sort(sortByAvailability);

  return (
    <>
      <section className="flex flex-wrap gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} props={product} />
        ))}
      </section>
    </>
  );
}

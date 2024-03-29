import { Link, useOutletContext } from 'react-router-dom';
import { formatPrice } from '../utils/formatting';
import { getGameByProductId } from '../utils/products';
import StockIndicator from './StockIndicator';
import AddProductButton from './AddProductButton';

export default function ProductCard({ product }) {
  const { addToCart } = useOutletContext();
  const { id, name, price, faction, image, stock } = product;
  const game = getGameByProductId(id);

  const handleAddToCart = () => {
    return addToCart(product, 1);
  };

  return (
    <Link to={`/${game}/${id}`}>
      <article
        className="flex h-full w-full flex-col justify-end rounded border p-3 shadow-sm
          hover:border-gray-400 hover:shadow-lg"
      >
        <img
          className="mb-auto"
          src={`${image}--400.webp` || '/images/200.svg'}
          alt=""
          width={400}
          height={413}
        />
        <p className="mt-4 text-xl font-bold text-indigo-500">{formatPrice(price)}</p>
        <h2 className="font-semibold">{name || 'Placeholder'}</h2>
        <h3 className="mb-4 text-sm text-gray-500">{faction || 'Unknown'}</h3>
        <StockIndicator stock={stock} />
        <AddProductButton stock={stock} addToCart={handleAddToCart} />
      </article>
    </Link>
  );
}

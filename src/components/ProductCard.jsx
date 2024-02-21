import { Link, useOutletContext, useParams } from 'react-router-dom';
import { formatPrice } from '../utils/formatting';
import StockIndicator from './StockIndicator';
import AddProductButton from './AddProductButton';

export default function ProductCard({ product }) {
  const { game } = useParams();
  const { addToCart } = useOutletContext();
  const { id, name, price, faction, image, stock } = product;

  const handleClick = (e) => {
    e.preventDefault();

    addToCart(product, 1);
  };

  return (
    <Link to={`/${game}/${id}`}>
      <article
        className="flex h-full flex-col rounded border p-3 shadow-sm hover:border-gray-400
          hover:shadow-lg"
      >
        <img className="mb-auto" src={image || '/images/200.svg'} alt=""></img>
        <p className="mt-4 text-xl font-bold text-indigo-500">{formatPrice(price)}</p>
        <h2 className="font-semibold">{name || 'Placeholder'}</h2>
        <h3 className="mb-4 text-sm text-gray-500">{faction || 'Unknown'}</h3>
        <StockIndicator stock={stock} />
        <AddProductButton stock={stock} onClick={handleClick} />
      </article>
    </Link>
  );
}

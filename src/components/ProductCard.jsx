import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../utils/formatting';
import StockIndicator from './StockIndicator';
import AddProductButton from './AddProductButton';

export default function ProductCard({ props }) {
  const { game } = useParams();
  const { id, name, price, faction, image, stock } = props;

  const handleClick = (e) => {
    e.preventDefault();

    console.log(props);
  };

  return (
    <Link to={`/${game}/${id}`}>
      <article
        className="flex h-full w-48 flex-col rounded border p-3 shadow-sm hover:border-gray-400
          hover:shadow-lg"
      >
        <img
          className="mb-auto"
          height={171}
          width={166}
          src={image || '/images/200.svg'}
          alt=""
        ></img>
        <p className="mt-4 text-xl font-bold text-indigo-500">{formatPrice(price)}</p>
        <h2 className="font-semibold">{faction || 'Unknown'}</h2>
        <h3 className="mb-4">{name || 'Placeholder'}</h3>
        <StockIndicator stock={stock} />
        <AddProductButton stock={stock} onClick={handleClick} />
      </article>
    </Link>
  );
}

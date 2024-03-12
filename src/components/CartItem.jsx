import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatting';
import { getGameByProductId } from '../utils/products';
import QuantitySelector from './QuantitySelector';

export default function CartItem({ product, quantity, updateCartItem, removeFromCart }) {
  const game = getGameByProductId(product.id);

  const handleRemoveClick = () => {
    removeFromCart(product.id);
  };

  const handleQuantityChange = (newValue) => {
    updateCartItem(product.id, newValue);
  };

  return (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded border">
        <Link to={`/${game}/${product.id}`}>
          <img className="p-1" src={`${product.image}--100.webp`} alt="" width={100} height={103} />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Link to={`/${game}/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p className="ml-4">{formatPrice(product.price)}</p>
          </div>

          <p className="mt-1 text-sm text-gray-500">{product.faction}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <QuantitySelector
            id={product.id}
            initialValue={quantity}
            maxValue={product.stock}
            onChange={handleQuantityChange}
            isCart={true}
          />

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleRemoveClick}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

import { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { formatPrice } from '../utils/formatting';
import AddProductButton from '../components/AddProductButton';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import StockIndicator from '../components/StockIndicator';
import QuantitySelector from '../components/QuantitySelector';

export default function Product() {
  const navigate = useNavigate();
  const { game, productId } = useParams();
  const { data, isLoading, addToCart } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const product = data[game]?.find((p) => p.id === productId);

  if (!product) {
    return <ErrorMessage />;
  }

  const { id, name, price, faction, image, sku, stock } = product;

  const handleAddClick = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (newValue) => {
    setQuantity(newValue);
  };

  return (
    <>
      <button
        className="mb-4 rounded bg-gray-500 px-8 py-2 text-sm font-bold text-white hover:bg-gray-400
          focus:outline-none focus:ring focus:ring-gray-400/50"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <section className="flex flex-col gap-6 sm:flex-row">
        <article className="flex basis-7/12 items-center rounded border shadow-sm">
          <img src={image} alt=""></img>
        </article>

        <section className="flex-grow">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <h3 className="text-xl text-gray-500">{faction}</h3>

          <p className="my-4">
            <span className="font-semibold text-black">Product code:</span> {sku}
          </p>

          <p className="mb-16 text-4xl font-bold text-indigo-500">{formatPrice(price)}</p>

          <p>
            <span className="font-semibold text-black">Availability: </span>
            <StockIndicator stock={stock} />
          </p>

          <div className="my-2">
            <QuantitySelector
              id={id}
              initialValue={1}
              maxValue={stock}
              onChange={handleQuantityChange}
            />
          </div>

          <div className="xs:max-w-72">
            <AddProductButton stock={stock} onClick={handleAddClick} />
          </div>
        </section>
      </section>
    </>
  );
}

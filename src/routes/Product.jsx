import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { formatPrice } from '../utils/formatting';
import AddProductButton from '../components/AddProductButton';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import StockIndicator from '../components/StockIndicator';

export default function Product() {
  const navigate = useNavigate();
  const { game, productId } = useParams();
  const { data, isLoading } = useOutletContext();
  const product = data[game]?.find((p) => p.id === productId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <ErrorMessage />;
  }

  const { name, price, faction, image, sku, stock } = product;

  return (
    <main>
      <button
        className="mb-4 rounded bg-gray-500 px-8 py-2 text-sm font-bold text-white hover:bg-gray-400
          focus:outline-none focus:ring focus:ring-gray-400/50"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <section className="flex gap-6">
        <article className="basis-7/12 rounded border shadow-sm">
          <img src={image}></img>
        </article>
        <section className="flex-grow">
          <h2 className="text-2xl font-bold">{faction}</h2>
          <h3 className="text-2xl">{name}</h3>
          <p className="my-4">
            <span className="font-semibold text-black">Product code:</span> {sku}
          </p>
          <p className="mb-16 text-4xl font-bold text-indigo-500">{formatPrice(price)}</p>
          <p>
            <span className="font-semibold text-black">Availability: </span>
            <StockIndicator stock={stock} />
          </p>
          <AddProductButton stock={stock} />
        </section>
      </section>
    </main>
  );
}

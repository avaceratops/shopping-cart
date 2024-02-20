export default function StockIndicator({ stock }) {
  if (stock > 0) {
    return <span className="font-medium text-green-700">{stock}+ in stock</span>;
  }
  return <span className="font-medium text-red-600">Out of stock</span>;
}

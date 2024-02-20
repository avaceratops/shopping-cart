export default function AddProductButton({ stock, onClick }) {
  if (stock > 0) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-2 w-full max-w-64 rounded bg-indigo-600 px-4 py-2 text-sm font-bold text-white
          shadow hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500/50"
      >
        Add to cart
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={true}
      className="mt-2 w-full max-w-64 rounded bg-gray-500 px-4 py-2 text-sm font-bold text-white
        shadow"
    >
      Sold out
    </button>
  );
}

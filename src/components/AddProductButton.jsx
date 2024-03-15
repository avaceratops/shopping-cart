import { useEffect, useState } from 'react';

export default function AddProductButton({ stock, addToCart }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let timeoutId;

    if (status) {
      timeoutId = setTimeout(() => {
        setStatus(null);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [status]);

  function handleClick(e) {
    e.preventDefault();

    if (addToCart()) {
      setStatus('added');
    } else {
      setStatus('oos');
    }
  }

  if (stock > 0) {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={status !== null}
        className={`mt-2 w-full rounded bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow
        transition-colors duration-75 hover:bg-indigo-700 focus:outline-none focus:ring
        focus:ring-indigo-500/50 active:bg-indigo-800 ${
          status === 'added' ? 'disabled:bg-indigo-500' : 'disabled:bg-red-500'
        }`}
      >
        {status === 'added' ? 'Added' : status === 'oos' ? 'Not enough stock' : 'Add to cart'}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={true}
      className="mt-2 w-full rounded bg-gray-500 px-4 py-2 text-sm font-bold text-white shadow"
    >
      Sold out
    </button>
  );
}

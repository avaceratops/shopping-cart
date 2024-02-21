import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function CartButton({ totalQuantity, onClick }) {
  return (
    <button
      className="group flex items-center rounded-md p-2 hover:bg-gray-400 hover:text-white"
      onClick={onClick}
    >
      <span className="sr-only">Cart</span>
      <ShoppingBagIcon
        className="block h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white"
        aria-hidden="true"
      />
      <span className="ml-2 text-sm font-medium text-gray-800 group-hover:text-white">
        {totalQuantity}
      </span>
    </button>
  );
}

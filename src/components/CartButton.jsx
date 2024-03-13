import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function CartButton({ totalQuantity, onClick }) {
  return (
    <button
      className="group flex items-center rounded-md p-2 text-gray-400 hover:bg-slate-600
        hover:text-white focus:bg-slate-600 focus:text-white focus:outline-none focus:ring
        focus:ring-slate-400/50 active:bg-slate-700"
      onClick={onClick}
    >
      <span className="sr-only">Cart</span>
      <ShoppingBagIcon
        className="block h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white
          group-focus:text-white"
        aria-hidden="true"
      />
      <span
        className="ml-2 text-sm font-medium text-gray-800 group-hover:text-white
          group-focus:text-white"
      >
        {totalQuantity}
      </span>
    </button>
  );
}

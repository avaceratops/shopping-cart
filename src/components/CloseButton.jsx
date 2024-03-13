import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      className="relative -m-2 rounded-md p-2 text-gray-400 hover:bg-slate-600 hover:text-white
        focus:bg-slate-600 focus:text-white focus:outline-none focus:ring focus:ring-slate-400/50
        active:bg-slate-700"
      onClick={onClick}
    >
      <span className="sr-only">Close panel</span>
      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
    </button>
  );
}

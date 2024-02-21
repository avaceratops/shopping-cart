import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      className="relative -m-2 rounded-md p-2 text-gray-400 hover:bg-gray-400 hover:text-white"
      onClick={onClick}
    >
      <span className="sr-only">Close panel</span>
      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
    </button>
  );
}

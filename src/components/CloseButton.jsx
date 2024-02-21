export default function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
      onClick={onClick}
    >
      <span className="sr-only">Close panel</span>
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  );
}

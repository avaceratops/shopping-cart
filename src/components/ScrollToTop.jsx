import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop({ refScrollTop }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleVisibleButton = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleVisibleButton);

    return () => {
      window.removeEventListener('scroll', handleVisibleButton);
    };
  });

  const handleScrollTop = () => {
    refScrollTop.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-3 right-0 z-50 lg:hidden">
      <Transition
        show={visible}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <button
          className="rounded-l-xl bg-orange-500 p-3 hover:bg-orange-600 focus:outline-none
            focus:ring focus:ring-orange-500/50 active:bg-orange-700"
          onClick={handleScrollTop}
        >
          <span className="sr-only">Scroll to top</span>
          <ArrowUpIcon className="ml-0.5 h-4 w-4 stroke-[3px] text-white" aria-hidden="true" />
        </button>
      </Transition>
    </div>
  );
}

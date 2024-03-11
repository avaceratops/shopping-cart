import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  function handleSearch(e) {
    if (e.type === 'keydown' && e.key !== 'Enter') {
      return;
    }

    setOpen(false);
    if (query !== '') {
      navigate({ pathname: '/search', search: `?q=${query}` });
    }
  }

  return (
    <>
      <button
        className="group flex items-center rounded-md p-2 hover:bg-gray-400 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon
          className="block h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white"
          aria-hidden="true"
        />
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 flex justify-center pt-16" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-gray-900/25 opacity-100 backdrop-blur
                transition-opacity"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative w-full max-w-lg px-4">
              <Dialog.Panel className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full appearance-none py-4 pl-4 pr-12 text-slate-900
                      placeholder:text-slate-600 focus:outline-none"
                    placeholder="Search..."
                    defaultValue={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <button
                    className="absolute right-0 bg-indigo-600 p-4 text-white hover:bg-indigo-500
                      focus:bg-indigo-500 focus:shadow focus-visible:outline-none"
                    onClick={handleSearch}
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="pointer-events-none h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

import { Fragment, useState } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import CloseButton from './CloseButton';

export default function Dialog({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`rounded bg-gray-500 px-8 py-2 text-sm font-bold text-white hover:bg-gray-400
          focus:outline-none focus:ring focus:ring-gray-400/50`}
        onClick={() => setOpen(true)}
      >
        {title}
      </button>

      <Transition.Root show={open} as={Fragment}>
        <HeadlessDialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full ">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <HeadlessDialog.Panel className="pointer-events-auto w-screen max-w-sm">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="mb-8 flex items-center justify-between">
                      <HeadlessDialog.Title className="text-2xl font-bold text-black">
                        {title}
                      </HeadlessDialog.Title>
                      <CloseButton onClick={() => setOpen(false)} />
                    </div>
                    {children}
                  </div>
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </HeadlessDialog>
      </Transition.Root>
    </>
  );
}

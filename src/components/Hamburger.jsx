import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { NAVIGATION_LINKS } from '../utils/navigation';
import CloseButton from './CloseButton';
import styles from '../styles/NavLink.module.scss';

export default function Hamburger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="rounded-md p-2 text-gray-400 hover:bg-gray-400 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
              <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                <nav className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="mb-10 flex items-center justify-between">
                      <Dialog.Title className="text-2xl font-bold text-black">
                        shopping cart
                      </Dialog.Title>
                      <CloseButton onClick={() => setOpen(false)} />
                    </div>

                    <ul className="text-md flex flex-col gap-4 font-medium">
                      {NAVIGATION_LINKS.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={styles.navLink}
                          onClick={() => setOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </ul>
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

import { Disclosure, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

export default function Collapsible({ defaultOpen = false, buttonText, children }) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full items-center justify-between rounded focus-visible:outline-none
            focus-visible:ring focus-visible:ring-indigo-500/50 ${open ? 'text-indigo-600' : ''}`}
          >
            <span className="font-medium">{buttonText}</span>
            <span className="sr-only">{`${open ? 'Close' : 'Open'} panel`}</span>
            <div className="h-5 w-5">{open ? <MinusIcon /> : <PlusIcon />}</div>
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

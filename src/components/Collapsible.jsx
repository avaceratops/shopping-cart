import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

export default function Collapsible({ buttonText, panelText }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full items-center justify-between rounded py-6
            focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500/50 ${
              open ? 'text-indigo-600' : ''
            }`}
          >
            <span className="font-medium">{buttonText}</span>
            <span className="sr-only">{`${open ? 'Close' : 'Open'} panel`}</span>
            <div className="h-5 w-5">{open ? <MinusIcon /> : <PlusIcon />}</div>
          </Disclosure.Button>
          <Disclosure.Panel className="whitespace-pre-line text-gray-700">
            {panelText}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { formatPrice } from '../utils/formatting';
import CartButton from './CartButton';
import CartItem from './CartItem';
import CloseButton from './CloseButton';

export default function CartDialog({ cart, updateCartItem, removeFromCart }) {
  const [open, setOpen] = useState(false);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <>
      <CartButton totalQuantity={totalQuantity} onClick={() => setOpen(true)} />

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

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-2xl font-bold text-black">
                        shopping cart
                      </Dialog.Title>

                      <div className="ml-3 flex h-7 items-center">
                        <CloseButton onClick={() => setOpen(false)} />
                      </div>
                    </div>

                    <div className="mt-8 flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <CartItem
                            key={item.product.id}
                            product={item.product}
                            quantity={item.quantity}
                            updateCartItem={updateCartItem}
                            removeFromCart={removeFromCart}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{formatPrice(totalPrice)}</p>
                    </div>

                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex justify-center rounded bg-indigo-600 px-6 py-3 font-bold
                          text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring
                          focus:ring-indigo-500/50"
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

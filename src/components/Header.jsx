import { NavLink } from 'react-router-dom';
import CartDialog from './CartDialog';
import '../styles/Header.scss';

export default function Header({ cart, updateCartItem, removeFromCart, clearCart }) {
  return (
    <header className="px-5">
      <div className="border-b border-gray-200">
        <nav className="flex h-16 items-center justify-between text-gray-700">
          <section className="flex-1">
            <h1 className="text-2xl font-bold leading-none tracking-tight text-black">
              shopping cart
            </h1>
          </section>

          <ul className="flex h-full space-x-8 text-sm font-medium">
            <NavLink to="/">
              <button>Home</button>
            </NavLink>
            <NavLink to="/warhammer-40k">
              <button>Warhammer 40,000</button>
            </NavLink>
            <NavLink to="/age-of-sigmar">
              <button>Age of Sigmar</button>
            </NavLink>
          </ul>

          <section className="flex flex-1 justify-end">
            <CartDialog
              cart={cart}
              updateCartItem={updateCartItem}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          </section>
        </nav>
      </div>
    </header>
  );
}

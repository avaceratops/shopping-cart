import { NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../utils/navigation';
import CartDialog from './CartDialog';
import Hamburger from './Hamburger';
import SearchDialog from './SearchDialog';
import styles from '../styles/NavLink.module.scss';

export default function Header({ cart, updateCartItem, removeFromCart, clearCart }) {
  return (
    <header className="sticky top-0 z-10 w-full max-w-screen-2xl bg-white/90 px-5 backdrop-blur">
      <div className="border-b border-gray-200">
        <nav className="flex h-16 items-center justify-between text-gray-700">
          <section className="flex flex-1 md:hidden">
            <Hamburger />
          </section>

          <section className="hidden sm:block lg:flex-1">
            <h1 className="text-2xl font-bold leading-none tracking-tight text-black">
              <NavLink to="/">shopping cart</NavLink>
            </h1>
          </section>

          <ul className="hidden h-full space-x-8 text-sm font-medium md:flex">
            {NAVIGATION_LINKS.filter((item) => item.name !== 'Home').map((item) => (
              <li key={item.name}>
                <NavLink to={item.to} className={styles.navLink}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <section className="flex flex-1 justify-end gap-1 md:flex-initial lg:flex-1">
            <SearchDialog />

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

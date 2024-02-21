import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { MAX_PURCHASE_QUANTITY } from '../utils/products';
import useProductData from '../hooks/useProductData';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Root() {
  const { data, isLoading, isError } = useProductData();
  const [cart, setCart] = useState([]);

  function addToCart(product, quantity = 1) {
    const index = cart.findIndex((item) => item.product.id === product.id);

    if (index !== -1) {
      // prevent the user from ordering unavailable stock
      const currentQuantity = cart[index].quantity;
      if (currentQuantity + quantity > Math.min(product.stock, MAX_PURCHASE_QUANTITY)) {
        return;
      }

      const newCart = [...cart];
      newCart[index].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  }

  function updateCartItem(productId, quantity) {
    const index = cart.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].quantity = quantity;
      setCart(newCart);
    }
  }

  function removeFromCart(productId) {
    const newCart = cart.filter((item) => item.product.id !== productId);
    setCart(newCart);
  }

  if (isError) {
    return <p>Unable to load product data. Please try refreshing the page.</p>;
  }

  return (
    <>
      <Header cart={cart} updateCartItem={updateCartItem} removeFromCart={removeFromCart} />
      <main className="px-5 py-10">
        <ScrollRestoration />
        <Outlet context={{ data, isLoading, addToCart }} />
      </main>
      <Footer />
    </>
  );
}

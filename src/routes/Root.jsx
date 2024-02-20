import { Outlet, ScrollRestoration } from 'react-router-dom';
import useProductData from '../hooks/useProductData';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Root() {
  const { data, isLoading, isError } = useProductData();

  if (isError) {
    return <p>Unable to load product data. Please try refreshing the page.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <main className="px-5 py-14">
        <ScrollRestoration />
        <Outlet context={data} />
      </main>
      <Footer />
    </>
  );
}

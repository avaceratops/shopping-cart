import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import Home from './routes/Home';
import Products from './routes/Products';
import Product from './routes/Product';
import Search from './routes/Search';
import ErrorMessage from './components/ErrorMessage';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: ':game',
        element: <Products />,
      },
      {
        path: ':game/:productId',
        element: <Product />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: '/*',
        element: <ErrorMessage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

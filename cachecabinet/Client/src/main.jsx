import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage/Home.jsx';
import CabinetPage from './pages/Main/CabinetPage.jsx';
import ErrorPage from './components/Error/ErrorPage.jsx';
import ViewCollection from './components/ViewCollection.jsx';
import Item from './components/item.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/main',
        element: <CabinetPage />,
      },
      {
        path: '/collection/:collectionId',
        element: <ViewCollection />,
      },
      {
        path: '/item/:itemId',
        element: <Item />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage/Home.jsx';
import CabinetPage from './pages/Main/CabinetPage.jsx';
import ErrorPage from './components/Error/ErrorPage.jsx';
import ViewCollection from './components/ViewCollection.jsx';
import CreateItem from './components/CreateItem.jsx';
import EditItem from './components/EditItem.jsx';
import EditCollection from './components/EditCollection.jsx';
import DeleteItem from './components/DeleteItem.jsx'; //added
import Register from './components/Register.jsx';

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
        path: '/register',
        element: <Register />,
      },
      {
        path: '/item/new',
        element: <CreateItem />,
      },
      {
        path: '/collection-edit',
        element: <EditCollection />,
      },
      {
        path: '/collection/:collectionId',
        element: <ViewCollection />,
      },
      {
        path: '/item/:itemId',
        element: <CreateItem />,
      },
      {
        path: '/item-edit',
        element: <EditItem />,
      },
      {
        path: '/delete/:itemId',
        element: <DeleteItem />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);


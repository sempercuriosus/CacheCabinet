// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <ApolloProvider client={client}>
      {isLoggedIn && (
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      <section
        id='topLevel'
        className='content section has-navbar-fixed-top'>
        <Outlet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </section>
      <Footer />
    </ApolloProvider>
  );
}

export default App;


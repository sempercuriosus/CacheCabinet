import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Collections from './components/collection/collections';
import Collection from './components/collection/collection';
import Item from './components/item/item';
import CreateItem from './components/item/CreateItem';
import Home from './components/Home/Home';



import {setContext} from '@apollo/client/link/context';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, {headers}) => {

  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? ('Bearer ' + token) : ''
    }
  }

});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path='/collections'
            element={<Collections />}
          />
          <Route path="/createcollection" element={<CreateCollection />} />
          <Route
            path='/viewcollection'
            element={<Collection />}
          />
          <Route
            path='/viewitems'
            element={<Item />}
          />
          <Route
            path='/createitem'
            element={<CreateItem />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;


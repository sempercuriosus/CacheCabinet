// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';

import Home from './components/Home/Home';
import Collections from './components/collection/collections';
import Collection from './components/collection/collection';
import Item from './components/item/item';
import CreateItem from './components/item/CreateItem';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <Routes>
          {/* <Route path for login and register */}
          <Route 
          path='/'
          element={<Home />}
          />
          <Route
            path='/collections'
            element={<Collections />}
          />
          {/* <Route path="/createcollection" element={<CreateCollection />} /> */}
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
      <Footer />
    </ApolloProvider>
  );
}

export default App;


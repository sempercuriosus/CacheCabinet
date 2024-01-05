import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/createcollection" element={<CreateCollection />} />
            <Route path="/viewcollection" element={<Collection />} />
            <Route path="/viewitems" element={<Item />} />
            <Route path="/createitem" element={<CreateItem />} />
          </Routes>
      </Router >
    </ApolloProvider>
  );
}

export default App

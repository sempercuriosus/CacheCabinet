import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Item from './item';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION } from '../utils/queries';
import DisplayError from '../components/Error/DisplayError';

const ViewCollection = () => {
  const { collectionId } = useParams();

  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: {
      collectionId: collectionId,
    },
  });

  if (error) {
    return <DisplayError />;
  }

  if (loading) {
    return <h1 className='title is-3'>Loading...</h1>;
  }

  if (data) {
    const items = data.getCollection.items;

    return (
      <Fragment>
        <Item items={items} />
      </Fragment>
    );
  }
};
export default ViewCollection;


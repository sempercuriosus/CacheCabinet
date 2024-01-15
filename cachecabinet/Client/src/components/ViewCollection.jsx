import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Item from './item';
import CreateItem from './CreateItem';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION } from '../utils/queries';
import DisplayError from '../components/Error/DisplayError';

const ViewCollection = () => {
  const { collectionId } = useParams();

  const [collection, setCollection] = useState([]);
  const [showCreateItem, setShowCreateItem] = useState(true);

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

  const handleAddItem = (newItem) => {
    // Update the collection state with the new item
    setCollection((prevCollection) => [...prevCollection, newItem]);
    // Hide the CreateItem component
    setShowCreateItem(false);
  };

  const handleEditItem = (index, updatedItem) => {
    // Update the collection state with the edited item
    setCollection((prevCollection) => {
      const newCollection = [...prevCollection];
      newCollection[index] = updatedItem;
      return newCollection;
    });
  };

  if (data) {
    const items = data.getCollection.items;

    return (
      <Fragment>
        <div className='content section'>
          {/* Render CreateItem component with the callback and show/hide logic */}
          {/* {showCreateItem && <CreateItem onAddItem={handleAddItem} />} */}
          {/* Display Item components for each item in the collection */}
          <Item items={items} />
        </div>
      </Fragment>
    );
  }
};
export default ViewCollection;


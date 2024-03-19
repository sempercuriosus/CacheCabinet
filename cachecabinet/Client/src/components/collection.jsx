import React, { useState, Fragment, useEffect } from 'react';
import colorPalette from '../utils/colorPalette';
import CreateItem from './CreateItem';
import '../../src/assets/CabinetPage.css';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_COLLECTION, GET_COLLECTION } from '../utils/queries';
import DeleteCollection from './DeleteCollection';


const Collection = ({ userCollections }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const navigate = useNavigate();
  const [deleteCollection] = useMutation(DELETE_COLLECTION);
  const { refetch: refetchCollection } = useQuery(GET_COLLECTION);

  const cardStyle = {
    backgroundColor: colorPalette.IVORY,
    minWidth: '200px',
    minHeight: '100px',
  };

  const handleViewClick = (collectionId) => {
    setSelectedCollection(collectionId);
    navigate(`/collection/${collectionId}`);
  };

  const handleEditClick = (collection) => {
    navigate('/collection-edit?collectionId=' + collection._id);
  };

  const updateCollectionList = async () => {
    try {
        await refetchCollection();
    } catch (error) {
        console.error('Error refetching collections:', error);
    }
  };

  const handleDeleteCollection = async (collectionId, updateCollections) => {
    try {
      await deleteCollection({
        variables: {
          collectionId: collectionId,
        },
        refetchQueries: [{ query: GET_COLLECTION }],
      });
      onClose();
      navigate('/main');
      // setSelectedCollection(null); // Reset selected collection after deletion
      updateCollections(collectionList.filter((collection) => collection._id !== collectionId));
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const handleDeleteClick = (collectionId) => {
    console.log('Deleting collection:', collectionId);
    setSelectedCollection(collectionId);
  };

  return (
    <Fragment>
      {userCollections.collections.map((collection) => (
        <div
          className='card block'
          style={cardStyle}
          key={collection._id}>
          <div className='card-content has-text-centered'>
            <h2 className='title is-4'>{collection.name}</h2>
            <h3 className='subtitle is-6'>{collection.description}</h3>

            {/* Conditional rendering for additional info */}
            {/* {selectedCollection === collection._id && <CreateItem />} */}
          </div>

          <footer className='card-footer'>
            <a
              href=''
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.BABYBLUE }}
              onClick={() => handleViewClick(collection._id)}>
              View
            </a>
            <a
              href=''
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.SAGE }}
              onClick={() => handleEditClick(collection)}>
              Edit
            </a>
            <button
              className='card-footer-item button is-danger'
              style={{ backgroundColor: colorPalette.DUSTYROSE }}
              onClick={() => handleDeleteClick(collection._id)}>
              Delete
            </button>
          </footer>
        </div>
      ))}  
      {/* Render DeleteCollection component conditionally */}
      {selectedCollection && (
        <DeleteCollection
          collectionId={selectedCollection}
          onClose={() => setSelectedCollection(null)}
          updateCollectionList={updateCollectionList}
          />
      )}
    </Fragment>
  );
};

export default Collection;


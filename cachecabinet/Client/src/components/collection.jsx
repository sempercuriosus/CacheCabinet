import React, { useState, useEffect } from 'react';
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0.75em',
    border: 'thin black solid',
  };

  const handleViewClick = (collectionId) => {
    setSelectedCollection(collectionId);
    navigate(`/collection/${collectionId}`);
  };

  const handleEditClick = (collection) => {
    navigate('/collection-edit?collectionId=' + collection._id);
  };


  // Footer Style

  const updateCollectionList = async () => {
    try {
        await refetchCollection({
          collectionId: selectedCollection
        });
    } catch (error) {
        console.error('Error refetching collections:', error);
    }
  };

  const handleDeleteClick = (collectionId) => {
    console.log('Deleting collection:', collectionId);
    setSelectedCollection(collectionId);
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      await deleteCollection({
        variables: {
          collectionId,
        },
        refetchQueries: [{ query: GET_COLLECTION }],
      });
      onClose();
      navigate('/main');
      await refetchCollection();
      setSelectedCollection(null); // Reset selected collection after deletion
      updateCollections(collectionList.filter((collection) => collection._id !== collectionId));
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  return (
    <>
      {userCollections.collections.map((collection) => (
        <div
          className='column is-full-mobile 
          is-two-thirds-tablet
          is-half-desktop
          is-one-third-widescreen
          card 
          block'
          style={cardStyle}
          key={collection._id}>
          <p className='card-header-title title is-4'>{collection.name}</p>

          <div
            className='card-content subtitle is-5'
            style={{ height: '100%' }}>
            <div className='content'>
              {collection.description ? collection.description : <br />}
            </div>
            {/* Conditional rendering for additional info */}
            {/* {selectedCollection === collection._id && <CreateItem />} */}
          </div>

          <footer className='card-footer'>
            <a
              href=''
              className='card-footer-item button has-text-black'
              style={{
                backgroundColor: colorPalette.BABYBLUE,
                border: 'thin black solid',
                marginLeft: '0.55rem',
                marginRight: '0.55rem',
              }}
              onClick={() => handleViewClick(collection._id)}>
              View
            </a>
            <a
              href=''
              className='card-footer-item button has-text-black'
              style={{
                backgroundColor: colorPalette.SAGE,
                border: 'thin black solid',
                marginLeft: '0.55rem',
                marginRight: '0.55rem',
              }}
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
    </>

  );
};

export default Collection;


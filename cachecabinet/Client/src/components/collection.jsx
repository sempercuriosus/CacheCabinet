import React, { useState, useEffect } from 'react';
import colorPalette from '../utils/colorPalette';
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
  const [isModalActive, setIsModalActive] = useState(false);

  // Modal

  // Open
  const openModal = (serviceType) => {
    setIsModalActive(true);
  };

  // Close
  const closeModal = () => {
    setIsModalActive(false);
  };

  // Effect
  useEffect(() => {
    // Modal ESC Button
    const handleEsc = (event) => {
      console.log('Handling Escape key press');
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const cardStyle = {
    backgroundColor: colorPalette.IVORY,
    minWidth: '250px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1em',
    border: 'thin black solid',
  };

  // View
  const handleViewClick = (collectionId) => {
    setSelectedCollection(collectionId);
    navigate(`/collection/${collectionId}`);
  };

  // Edit    
  const handleEditClick = (collection) => {
    navigate('/collection-edit?collectionId=' + collection._id);
  };

  // Footer Style

  const updateCollectionList = async () => {
    try {
      await refetchCollection({
        collectionId: selectedCollection,
      });
    } catch (error) {
      console.error('Error refetching collections:', error);
    }
  };

  const handleDeleteClick = (collectionId) => {
    console.log('Deleting collection:', collectionId);
    setSelectedCollection(collectionId);
    setIsModalActive(true);
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
      updateCollections(
        collectionList.filter((collection) => collection._id !== collectionId),
      );
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  return (
    <div className="columns is-mobile is-multiline"> {/* Use is-multiline to wrap cards */}
      {userCollections.collections.map((collection) => (
        <div
          className='column
          is-half-desktop'
          key={collection._id}>
          <div className="card" style={cardStyle}>
            <p className='card-header-title title is-'>{collection.name}</p>

            <div
              className='card-content subtitle is-3'
              style={{ height: '100%' }}>
              <div className='content'>
                {collection.description ? collection.description : <br />}
              </div>
              {/* Conditional rendering for additional info */}
              {/* {selectedCollection === collection._id && <CreateItem />} */}
            </div>

            <footer
              className='card-footer'
              style={{ padding: '1rem' }}>
              <a
                href=''
                className='card-footer-item button has-text-black'
                style={{
                  backgroundColor: colorPalette.BABYBLUE,
                  color: 'black',
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
                  color: 'black',
                  border: 'thin black solid',
                  marginLeft: '0.55rem',
                  marginRight: '0.55rem',
                }}
                onClick={() => handleEditClick(collection)}>
                Edit
              </a>

              <a
                className='card-footer-item button has-text-black'
                style={{
                  backgroundColor: colorPalette.IVORY,
                  color: 'black',
                  border: 'thin black solid',
                  marginLeft: '0.55rem',
                  marginRight: '0.55rem',
                }}
                onClick={() => handleDeleteClick(collection._id)}>
                Delete
              </a>
            </footer>
          </div>
        </div>
      ))}

      {/* Render DeleteCollection component conditionally */}
      {/* IF there is a selected collection AND the modal is active THEN render the modal */}

      {selectedCollection && isModalActive && (
        <div className='modal is-active'>
          {/* Modal Overlay */}
          <div
            className='modal-background'
            onClick={closeModal}></div>

          {/* Modal Close Button */}
          <button
            className='modal-close'
            aria-label='close'
            onClick={closeModal}></button>

          {/* Modal Content */}
          <div className='box modal-content'>
            <DeleteCollection
              collectionId={selectedCollection}
              onClose={() => setSelectedCollection(null)}
              updateCollectionList={updateCollectionList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;


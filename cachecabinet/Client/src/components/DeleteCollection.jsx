import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_COLLECTION, GET_COLLECTION } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import colorPalette from '../utils/colorPalette';

const DeleteCollection = ({ onClose, updateCollectionList, collectionId }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteCollection] = useMutation(DELETE_COLLECTION, {
    onCompleted: () => {
      onClose();
      navigate('/main');
    },
    refetchQueries: [{ query: GET_COLLECTION }],
  });

  // const { refetch } = useQuery(GET_COLLECTION);

  const handleDeleteCollection = async () => {
    try {
      await deleteCollection({
        variables: {
          collectionId,
        },
      });
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmedDelete = async () => {
    await handleDeleteCollection();
    updateCollectionList();
  };

  return (
    <div>
      <h2>Delete Collection</h2>
      <p>Are you sure you want to delete this collection?</p>
      {/* {!showConfirmation && (
                <button onClick={confirmDelete}>Delete</button>
            )} */}
      {/* {showConfirmation && ( */}
      <div>
        <button
          className='button block'
          style={{ backgroundColor: colorPalette.DUSTYROSE }}
          onClick={handleConfirmedDelete}>
          Confirm Delete
        </button>
        {/* <button
          className='button block'
          style={{ onHover: 'is-success' }}
          onClick={cancelDelete}>
          Cancel
        </button> */}
      </div>
      {/* )} */}
    </div>
  );
};

export default DeleteCollection;


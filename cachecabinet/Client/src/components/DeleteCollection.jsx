import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COLLECTION, GET_COLLECTION } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import colorPalette from '../utils/colorPalette';

const DeleteCollection = ({ onClose, updateCollectionList, collectionId }) => {
  const navigate = useNavigate();
  const [deleteCollection] = useMutation(DELETE_COLLECTION, {
    onCompleted: () => {
      onClose();
      navigate('/main');
    },
    refetchQueries: [{ query: GET_COLLECTION }],
  });

  const handleDeleteCollection = async () => {
    try {
      await deleteCollection({
        variables: {
          collectionId,
        },
      });
      window.location.reload(); // Reload the screen after deletion
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const handleConfirmedDelete = async () => {
    await handleDeleteCollection();
    updateCollectionList();
  };

  return (
    <div>
      <h2>Delete Collection</h2>
      <p>Are you sure you want to delete this collection?</p>
      <div>
        <button
          className='button block'
          style={{ backgroundColor: colorPalette.DUSTYROSE }}
          onClick={handleConfirmedDelete}>
          Confirm Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteCollection;

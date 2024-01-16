import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_COLLECTION } from '../utils/mutations';
import colorPalette from '../utils/colorPalette';
import { useLocation } from 'react-router-dom';

const EditCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [updateCollection] = useMutation(UPDATE_COLLECTION);
  const [searchParams, setSetParams] = useSearchParams();

  const location = useLocation();
  const collectionData = location.state;

  const handleAddCollection = async () => {
    try {
      const collectionId = searchParams.get('collectionId');

      if (collectionName.trim() !== '') {
        const editedCollection = {
          name: collectionName,
          description: collectionDescription,
        };

        console.log(editedCollection);

        await updateCollection({
          variables: {
            collectionId: collectionId,
            updatedCollection: editedCollection,
          },
        });

        // Reset form state
        setCollectionName('');
        setCollectionDescription('');
      }
    } catch (error) {
      console.error('Error adding collection:', error);
    }
  };

  return (
    <div
      className='box has-text-centered'
      style={{ maxWidth: '550px' }}>
      <h2 className='title is-4'>Update The Collection</h2>
      <div className='is-flex is-justify-content-flex-end'></div>
      <div className='field'>
        <label className='label'>New Name</label>
        <div className='control block'>
          <input
            className='input'
            type='text'
            placeholder='Enter collection name'
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </div>
        <label className='label'>New Description</label>
        <div className='control'>
          <textarea
            className='textarea'
            placeholder='Enter collection description'
            value={collectionDescription}
            onChange={(e) =>
              setCollectionDescription(e.target.value)
            }></textarea>
        </div>
        <div className='control'>
          <button
            className='button'
            style={{ backgroundColor: colorPalette.SAGE }}
            onClick={handleAddCollection}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCollection;


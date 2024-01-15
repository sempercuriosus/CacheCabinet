import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COLLECTION } from '../utils/mutations';
import colorPalette from '../utils/colorPalette';

const CreateCollection = ({ onAddCollection }) => {
  const [showForm, setShowForm] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

  const [addCollection] = useMutation(ADD_COLLECTION);

  const handleAddCollection = async () => {
    try {
      if (collectionName.trim() !== '') {
        const newCollection = {
          name: collectionName,
          description: collectionDescription,
        };

        await addCollection({
          variables: { collectionData: newCollection },
        });

        // Pass the new collection to the parent component
        onAddCollection(newCollection);

        // Reset form state
        setCollectionName('');
        setCollectionDescription('');
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding collection:', error);
    }
  };

  return (
    <div
      className='box has-text-centered'
      style={{ maxWidth: '400px' }}>
      <h2 className='title is-4'>Create a Collection</h2>
      <div className='is-flex is-justify-content-flex-end'>
        <button
          style={{ backgroundColor: colorPalette.SAGE }}
          className='button is-light is-rounded plus-button'
          onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            'Cancel'
          ) : (
            <i className='material-icons has-text-danger'>add</i>
          )}
        </button>
      </div>
      {showForm && (
        <div className='field'>
          <label className='label'>Collection Name</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder='Enter collection name'
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </div>
          <label className='label'>Collection Description</label>
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
              className='button is-primary'
              onClick={handleAddCollection}>
              Add Collection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCollection;


import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COLLECTION_NAMEDESC } from '../utils/queries';
import { UPDATE_COLLECTION } from '../utils/mutations';
import colorPalette from '../utils/colorPalette';
import DisplayError from '../components/Error/DisplayError';

const EditCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [updateCollection] = useMutation(UPDATE_COLLECTION);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // extract the query param
  const collectionId = searchParams.get('collectionId');

  const { loading, error, data } = useQuery(GET_COLLECTION_NAMEDESC, {
    variables: {
      collectionId: collectionId,
    },
  });

  useEffect(() => {
    if (data) {
      const { name, description } = data.getCollectionNameDesc;
      setCollectionName(name);
      setCollectionDescription(description);
    }
  }, [data]);

  const handleAddCollection = async () => {
    try {
      if (collectionName.trim() !== '') {
        const editedCollection = {
          name: collectionName,
          description: collectionDescription,
        };

        await updateCollection({
          variables: {
            collectionId: collectionId,
            updatedCollection: editedCollection,
          },
        });

        navigate('/main');

        // Reset form state
        setCollectionName('');
        setCollectionDescription('');
      }
    } catch (error) {
      console.error('Error adding collection:', error);
    }
  };

  if (error) {
    return <DisplayError />;
  }

  if (loading) {
    return <h1 className='title is-3'>Loading...</h1>;
  }

  // Card
  const cardStyle = {
    maxWidth: '500px',
    border: 'solid black thin',
    backgroundColor: colorPalette.IVORY,
  };

  return (
    <div
      className='container box has-text-centered'
      style={cardStyle}>
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


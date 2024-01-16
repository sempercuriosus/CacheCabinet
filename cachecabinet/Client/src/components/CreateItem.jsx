import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import colorPalette from '../utils/colorPalette';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../utils/mutations';



const CreateItem = ({ onAddItem }) => {
  // State variables for the form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [forSale, setForSale] = useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [error, setError] = useState('');
  const [
    addItem,
    { data: itemData, loading: addItemLoading, error: addItemError },
  ] = useMutation(ADD_ITEM);

  // extract the query param
  const [searchParams, setSetParams] = useSearchParams();

  const collectionId = searchParams.get('collectionId');

  // Function to handle form submission
  const handleAddItem = async () => {
    // Validate and collect item data
    if (!name) {
      setError('Please enter a name.');
      return;
    }

    const newItem = {
      name: name,
      description: description,
      purchasePrice: parseFloat(purchasePrice) || 0.0,
      dateAdded: dateAdded,
      forSale: forSale,
      salePrice: forSale ? parseFloat(salePrice) : 0.0, // Only include salePrice if forSale is true
    };

    

    await addItem({
      variables: { collectionId: collectionId, itemData: newItem },
    });

    // Pass the new item data to the parent component
    // onAddItem(newItem);

    // Clear the form fields after adding the item
    setName('');
    setDescription('');
    setPurchasePrice('');
    setDateAdded('');
    setForSale(false);
    setSalePrice('');
    setError(''); // Clear the error message
  };

  const handleImageUpload = () => {
    // Logic to handle image upload
    console.log('Image upload logic goes here');
  };

  return (
    <div
      className='card'
      style={{
        backgroundColor: colorPalette.DUSTYROSE,
        overflow: 'auto',
        width: '500px',
      }}>
      <div className='card-content'>
        <button
          className='button is-primary'
          style={{ backgroundColor: colorPalette.BABYBLUE }}
          type='button'
          onClick={handleImageUpload}>
          Upload Image
        </button>
        <div className='content'>
          <form>
            <div className='field'>
              <label className='label'>Name</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Description</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* Display the error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='field'>
              <label className='label'>Purchase Price</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Purchase Price'
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>
            </div>
            {forSale && (
              <div className='field'>
                <label className='label'>Sale Price</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    placeholder='Sale Price'
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className='field'>
              <label className='label'>Date Added</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Date Added'
                  value={dateAdded}
                  onChange={(e) => setDateAdded(e.target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <label className='checkbox'>
                <input
                  type='checkbox'
                  checked={forSale}
                  onChange={() => setForSale(!forSale)}
                />
                For Sale
              </label>
            </div>
            <div className='field'>
              <div className='control'>
                <button
                  className='button is-primary'
                  style={{ backgroundColor: colorPalette.SAGE }}
                  type='button'
                  onClick={handleAddItem}>
                  Add Item
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;


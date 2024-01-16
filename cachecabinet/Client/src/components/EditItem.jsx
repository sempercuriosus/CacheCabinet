import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_ITEM } from '../utils/mutations';
import colorPalette from '../utils/colorPalette';
import { useLocation } from 'react-router-dom';

const EditItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [forSale, setForSale] = useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [imageData, setImageData] = useState('');
  const [updateItem] = useMutation(UPDATE_ITEM);

  const [searchParams, setSetParams] = useSearchParams();

  const location = useLocation();
  const itemData = location.state;

  const handleAddItem = async () => {
    try {
      const itemId = searchParams.get('itemId');

      if (itemName.trim() !== '') {
        const editedItem = {
          name: itemName,
          description: itemDescription,
          purchasePrice: parseFloat(purchasePrice) || 0.0,
          forSale: forSale,
          dateAdded: dateAdded,
          salePrice: forSale ? parseFloat(salePrice) : 0.0,
          imageData,
        };

        const handleSave = () => {
          onSave({
            ...editedData,
            
          });
        };

        console.log(editedItem);

        await updateItem({
          variables: {
            itemId: itemId,
            updatedItem: editedItem,
          },
        });

        // Reset form state
        setItemName('');
        setItemDescription('');
        setPurchasePrice('');
        setDateAdded('');
        setForSale(false);
        setImageData('');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleImageUpload = () => {
    // Logic to handle image upload
    if (imageData) {
      console.log('Image URL:', imageData);
      setImageData(imageData);
    }
  };

  return (
    <div
      className='box has-text-centered'
      style={{ maxWidth: '550px' }}>
      <h2 className='title is-4'>Update The Item</h2>
      <div className='is-flex is-justify-content-flex-end'></div>
      <div className='field'>
        <label className='label'>New Name</label>
        <div className='control block'>
          <input
            className='input'
            type='text'
            placeholder='Enter item name'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <label className='label'>New Description</label>
        <div className='control'>
          <textarea
            className='textarea'
            placeholder='Enter item description'
            value={itemDescription}
            onChange={(e) =>
              setItemDescription(e.target.value)
            }></textarea>
        </div>
        <label className='label'>Purchase Price</label>
        <div className='control'>
          <textarea
            className='textarea'
            placeholder='Enter item description'
            value={purchasePrice}
            onChange={(e) =>
              setPurchasePrice(e.target.value)
            }></textarea>
        </div>
        <label className='label'>Date Added</label>
        <div className='control'>
          <textarea
            className='textarea'
            placeholder='Enter item description'
            value={dateAdded}
            onChange={(e) =>
              setItemDescription(e.target.value)
            }></textarea>
        </div>        
        <label className="checkbox">
          <input
            type="checkbox"
            checked={forSale}
            onChange={() => setForSale(!forSale)}
          />
          For Sale
        </label>
        {forSale && (
              <div className="field">
                <label className="label">Sale Price</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Sale Price"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
              </div>
            )}
        <label className='label'>Image URL</label>
        <div className='control'>
        {/* <button 
          className="button is-primary" 
          style={{ backgroundColor: colorPalette.BABYBLUE }} 
          type="button" onClick={handleImageUpload}>
          Upload Image
        </button> */}
        <input
          className="input"
          type="text"
          placeholder="Enter Image URL"
          value={imageData}
          onChange={(e) => setImageData(e.target.value)}
        />
        {/* Display the image */}
        {imageData && <img src={imageData} alt="Uploaded image" />}
        </div> 
        <div className='control'>
          <button
            className='button'
            style={{ backgroundColor: colorPalette.SAGE }}
            onClick={handleAddItem}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

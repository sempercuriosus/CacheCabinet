import React, { useState } from 'react';
import colorPalette from '../utils/colorPalette';

const CreateItem = ({ onAddItem }) => {
  // State variables for the form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [forSale, setForSale] = useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [error, setError] = useState('');
  const [imageData, setImageData] = useState('');

  // Function to handle form submission
  const handleAddItem = () => {
    // Validate and collect item data
    if (!name || !description) {
      setError('Please enter a name and description');
      return;
    }
  
    console.log('Image Data before calling onAddItem:', imageData);
  
    const newItem = {
      name,
      description,
      purchasePrice,
      dateAdded,
      forSale,
      salePrice: forSale ? salePrice : '', // Only include salePrice if forSale is true
      imageData, // Pass the image URL directly
    };
    console.log('New item data:', newItem);
  
    // Pass the new item data to the parent component
    onAddItem(newItem);

    // Clear the form fields after adding the item
    setName('');
    setDescription('');
    setPurchasePrice('');
    setDateAdded('');
    setForSale(false);
    setSalePrice('');
    setError(''); // Clear the error message
    setImageData('');
  };

  const handleImageUpload = () => {
    // Logic to handle image upload
    if (imageData) {
      console.log('Image URL:', imageData);
      setImageData(imageData);
    }
  };

  return (
    <div className="card" style={{ backgroundColor: colorPalette.DUSTYROSE }}>
      <div className="card-content">
        <button className="button is-primary" style={{ backgroundColor: colorPalette.NUDE }} type="button" onClick={handleImageUpload}>
          Upload Image
        </button>
        <input
          className="input"
          type="text"
          placeholder="Enter Image URL"
          value={imageData}
          onChange={(e) => setImageData(e.target.value)}
        />
        {/* Display the image */}
        {imageData && <img src={imageData} alt="Uploaded image" />}
        <div className="content">
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* Display the error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="field">
              <label className="label">Purchase Price</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Purchase Price"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>
            </div>
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
            <div className="field">
              <label className="label">Date Added</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Date Added"
                  value={dateAdded}
                  onChange={(e) => setDateAdded(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={forSale}
                  onChange={() => setForSale(!forSale)}
                />
                For Sale
              </label>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary" style={{ backgroundColor: colorPalette.NUDE }} type="button" onClick={handleAddItem}>
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

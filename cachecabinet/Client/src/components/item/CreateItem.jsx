import React, { useState } from 'react';

const CreateItem = () => {
  // State variables for the form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [forSale, setForSale] = useState(false);

  // Function to handle form submission
  const handleAddItem = () => {
    // Perform any necessary validation before adding the item to the collection
    // For simplicity, let's just log the values for now
    console.log({
      name,
      description,
      purchasePrice,
      dateAdded,
      forSale,
    });

    // Clear the form fields after adding the item
    setName('');
    setDescription('');
    setPurchasePrice('');
    setDateAdded('');
    setForSale(false);
  };

  const handleImageUpload = () => {
    // Logic to handle image upload
    console.log('Image upload logic goes here');
  };

  return (
    <div className='AddItem'>
    <h2 className='collectionname'>Sample 1 Collection</h2>
    <button className='imageupload' type="button" onClick={handleImageUpload}>
        Upload Image
      </button>
    <form>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Date Added"
          value={dateAdded}
          onChange={(e) => setDateAdded(e.target.value)}
        />
      </div>
      <div>
        <label>For Sale</label>
        <input
          type="checkbox"
          checked={forSale}
          onChange={() => setForSale(!forSale)}
        />
      </div>
      <button type="button" onClick={handleAddItem}>
        Add Item
      </button>
    </form>
  </div>
  );
};

export default CreateItem;

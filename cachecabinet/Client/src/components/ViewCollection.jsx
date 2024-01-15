import React, { useState } from 'react';
import colorPalette from '../utils/colorPalette';
import Item from './ViewCollection';
import CreateItem from './CreateItem';

const ViewCollection = () => {
  const [collection, setCollection] = useState([]);
  const [showCreateItem, setShowCreateItem] = useState(true);

  const handleAddItem = (newItem) => {
    // Update the collection state with the new item
    setCollection((prevCollection) => [...prevCollection, newItem]);
    // Hide the CreateItem component
    setShowCreateItem(false);
  };

  return (
    <div>
      {/* Render CreateItem component with the callback and show/hide logic */}
      {showCreateItem && <CreateItem onAddItem={handleAddItem} />}

      {/* Display Item components for each item in the collection */}
      {collection.map((item, index) => (
        <Item
          key={index}
          name={item.name}
          description={item.description}
          purchasePrice={item.purchasePrice}
          dateAdded={item.dateAdded}
          forSale={item.forSale}
          imageData={item.imageData}
          // Add more props based on your data structure
        />
      ))}
    </div>
  );
};

export default ViewCollection;

import React, { useState } from 'react';
import Item from './item';
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

  const handleEditItem = (index, updatedItem) => {
    // Update the collection state with the edited item
    setCollection((prevCollection) => {
      const newCollection = [...prevCollection];
      newCollection[index] = updatedItem;
      return newCollection;
    });
  };

  return (
    <div>
      {/* Render CreateItem component with the callback and show/hide logic */}
      {showCreateItem && <CreateItem onAddItem={handleAddItem} />}

      {/* Display Item components for each item in the collection */}
      {collection.map((item, index) => (
        <Item
          key={index}
          index={index}
          name={item.name}
          description={item.description}
          purchasePrice={item.purchasePrice}
          dateAdded={item.dateAdded}
          forSale={item.forSale}
          salePrice={item.salePrice}
          onEditItem={handleEditItem}
        />
      ))}
    </div>
  );
};

export default ViewCollection;

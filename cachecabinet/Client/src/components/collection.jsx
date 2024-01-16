import React, { useState, Fragment, useEffect } from 'react';
import colorPalette from '../utils/colorPalette';
import CreateItem from './CreateItem';
import '../../src/assets/CabinetPage.css';
import { useNavigate } from 'react-router-dom';

const Collection = ({ userCollections }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [editingCollection, setEditingCollection] = useState(null);
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: colorPalette.IVORY,
    minWidth: '200px',
    minHeight: '100px',
  };

  const handleViewClick = (collectionId) => {
    // Toggle selectedCollection state
    setSelectedCollection(collectionId);
    navigate(`/collection/${collectionId}`);
  };

  const handleEditClick = (collection) => {
    const { _id, name, description } = collection;

    setEditingCollection({
      collectionId: _id,
      collectionName: name,
      collectionDescription: description,
    });

    navigate('/collection-edit?collectionId=' + _id, {
      state: { _id, name, description },
    });
  };

  return (
    <Fragment>
      {userCollections.collections.map((collection) => (
        <div
          className='card block'
          style={cardStyle}
          key={collection._id}>
          <div className='card-content has-text-centered'>
            <h2 className='title is-4'>{collection.name}</h2>
            <h3 className='subtitle is-6'>{collection.description}</h3>

            {/* Conditional rendering for additional info */}
            {selectedCollection === collection._id && <CreateItem />}
          </div>

          <footer className='card-footer'>
            <a
              href=''
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.BABYBLUE }}
              onClick={() => handleViewClick(collection._id)}>
              View
            </a>
            <a
              href=''
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.SAGE }}
              onClick={() => handleEditClick(collection)}>
              Edit
            </a>
          </footer>
        </div>
      ))}
    </Fragment>
  );
};

export default Collection;


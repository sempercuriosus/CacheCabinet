import React, { useState, Fragment } from 'react';
import colorPalette from '../utils/colorPalette';

const Collection = ({ userCollections }) => {
  console.log('COLLLECTION PAGE DATA', JSON.stringify(userCollections));

  const [showViewCollection, setShowViewCollection] = useState(false);

  const cardStyle = {
    backgroundColor: colorPalette.IVORY,
    minWidth: '200px',
    minHeight: '100px',
  };

  const handleViewClick = () => {
    // Toggle showViewCollection state
    setShowViewCollection((prevShowViewCollection) => !prevShowViewCollection);
  };

  return (
    <Fragment>
      {userCollections.collections.map((collection) => (
        // Card
        <div
          className='card block'
          style={cardStyle}
          key={collection._id}>
          {/* Card Header */}

          <div className='card-content has-text-centered'>
            <h2 className='title is-4'>{collection.name}</h2>
            <h3 className='subtitle is-6'>{collection.description}</h3>
          </div>

          {/* Card Footer */}
          <footer className='card-footer'>
            <a
              href='#'
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.BABYBLUE }}
              onClick={handleViewClick}>
              View
            </a>
            <a
              href='#'
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.SAGE }}>
              Edit
            </a>
          </footer>
        </div> // end card
      ))}
    </Fragment>
  );
};

export default Collection;


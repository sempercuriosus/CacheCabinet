import React, { useState } from 'react';
import colorPalette from '../utils/colorPalette';
import ViewCollection from './ViewCollection'; 

const Collection = ({ name, description }) => {
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
    <div className='card' style={cardStyle}>
      <div className='card-content has-text-centered'> 
        <h2 className='title is-4'>{name}</h2>
        <h3 className='subtitle is-6'>{description}</h3>
      </div>
      <footer className='card-footer'>
        <a href='#' className='card-footer-item has-text-black' style={{ backgroundColor: colorPalette.BABYBLUE }} onClick={handleViewClick}>
          View
        </a>
        <a
          href='#'
          className='card-footer-item has-text-black'
          style={{ backgroundColor: colorPalette.SAGE }}>
          Edit
        </a>
      </footer>

      {showViewCollection && <ViewCollection />} {/* Render ViewCollection when showViewCollection is true */}
    </div>
  );
};

export default Collection;

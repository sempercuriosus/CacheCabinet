import React from 'react';
import colorPalette from '../utils/colorPalette';

function Item({ imageData, name, description, purchasePrice, dateAdded, forSale, salePrice }) {
  return (
    <div
      className='card'
      style={{
        backgroundColor: colorPalette.IVORY,
        // height: '300px',
        maxWidth: '400px',
      }}>
      <div className='card-image'>
        <figure className='image is-4by3'>
          {/* Use the passed imageData or provide a default placeholder */}
          <img
            src={imageData || 'https://bulma.io/images/placeholders/1280x960.png'}
            alt='Item Image'
          />
        </figure>
      </div>
      <div className='card-content'>
        <h2
          className='title is-4'
          style={{ color: '' }}>
          {name}
        </h2>
        <h3
          className='subtitle is-6'
          style={{ color: colorPalette.GREY }}>
          {description}
        </h3>
        <div className='content'>
          <div className='columns'>
            <p className='column is-half'>{`Purchase Price: ${purchasePrice}`}</p>
            <p className='column is-half'>{`Date Added: ${dateAdded}`}</p>
          </div>
          <p className='is-centered'>{`For Sale: ${forSale ? 'Yes' : 'No'}`}</p>
          
          {forSale && (
          <div className='field'>
            <p className='column'>{salePrice}</p>
          </div>
          )}


          
          <footer className='card-footer'>
            <a
              href='#'
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.BABYBLUE }}>
              Edit
            </a>
            <a
              href='#'
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.DUSTYROSE }}>
              Delete
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Item;

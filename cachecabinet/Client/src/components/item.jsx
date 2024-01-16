import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import colorPalette from '../utils/colorPalette';
import { useNavigate } from 'react-router-dom';

function Item({ items }) {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleViewClick = (item) => {
    setSelectedItem(item);
    navigate(`/item/${item._id}`);
  };

  const handleAddItemClick = () => {
    navigate('/item/new?collectionId=' + collectionId);
  };



  return (
    <Fragment>
      <div>
        <button onClick={handleAddItemClick}>+</button>
      </div>
      <div className='columns is-multiline'>
        {items.map((item) => (
          <div
            className='column is-mobile is-2'
            key={item._id}
            style={{
              position: 'relative',
              left: '20px',
              margin: '20px',
              marginLeft: '20px',
              marginBottom: '25px'
            }}>
            <div className='card' style={{ maxWidth: '240px', maxHeight: '500px', minHeight: '250px', minWidth: '100px', overflow: 'auto' }}>
              <div className='card-image'>
                <figure className='image is-1by4'>
                  <img
                    src={item.imageData || 'https://bulma.io/images/placeholders/1280x960.png'}
                    alt='Item Image'
                  />
                </figure>
              </div>
              <div className='card-content'>
                <h2 className='title is-5' style={{ color: '' }}>
                  {item.name}
                </h2>
                <h3 className='subtitle is-6' style={{ color: colorPalette.GREY }}>
                  {item.description}
                </h3>
                <div className='content'>
                  <div className='columns'>
                    <p className='column is-half'>{`Purchase Price: $ ${item.purchasePrice}`}</p>
                    <p className='column is-half'>{`Date Added: ${item.dateAdded}`}</p>
                  </div>
                  <p className='is-centered'>{`For Sale: ${item.forSale ? 'Yes' : 'No'}`}</p>

                  {item.forSale && (
                    <div className='field'>
                      <p className='column'>{item.salePrice}</p>
                    </div>
                  )}
                  <footer className='card-footer'>
                    <a
                      href=''
                      className='card-footer-item has-text-black'
                      style={{ backgroundColor: colorPalette.BABYBLUE }}
                      onClick={() => handleViewClick(item)}>
                      Edit
                    </a>
                    <a
                      href='#'
                      className='card-footer-item has-text-black'
                      style={{ backgroundColor: colorPalette.DUSTYROSE }}
                      >
                      Delete
                    </a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Item;

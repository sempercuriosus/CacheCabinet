import React, { useState, Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import colorPalette from '../utils/colorPalette';
import Swal from 'sweetalert2';

function Item({ items }) {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItemClick = () => {
    navigate('/item/new?collectionId=' + collectionId);
  };

  const handleEditClick = (item) => {
    const { _id, name, description, purchasePrice, dateAdded, imageData } =
      item;

    setEditingItem({
      itemId: _id,
      itemName: name,
      itemDescription: description,
      purchasePrice: purchasePrice,
      dateAdded: dateAdded,
      imageData: imageData,
    });

    navigate('/item-edit?itemId=' + _id, {
      state: { _id, name, description, purchasePrice, dateAdded, imageData },
    });
  };

  return (
    <Fragment>
      <div
        className='box container has-text-centered'
        style={{ maxWidth: '550px' }}>
        <h2 className='title is-4'>Create an Item</h2>
        <div className='is-flex is-justify-content-flex-end'>
          <button
            style={{ backgroundColor: colorPalette.BABYBLUE }}
            className='button is-light is-rounded plus-button'
            onClick={handleAddItemClick}>
            <i className='material-icons'>add</i>
          </button>
        </div>
      </div>
      <div className='columns is-multiline'>
        {items.map((item) => (
          <div
            className='container column is-mobile'
            key={item._id}
            style={{
              position: 'relative',
              left: '20px',
              margin: '10px',
              marginBottom: '25px',
            }}>
            <div
              className='card'
              style={{
                width: '300px',
                maxHeight: '700px',
                minHeight: '250px',
                // overflow: 'auto',
              }}>
              <div className='card-image'>
                <figure className='image is-1by4'>
                  <img
                    src={
                      item.imageData ||
                      'https://bulma.io/images/placeholders/1280x960.png'
                    }
                    alt='Item Image'
                  />
                </figure>
              </div>
              <div className='card-content'>
                <h2
                  className='title is-5'
                  style={{ color: '' }}>
                  {item.name}
                </h2>
                <h3
                  className='subtitle is-6'
                  style={{ color: colorPalette.GREY }}>
                  {item.description}
                </h3>
                <div className='content'>
                  <div className='columns'>
                    <p className='column is-half'>{`Purchase Price: $ ${item.purchasePrice}`}</p>
                    <p className='column is-half'>{`Date Added: ${item.dateAdded}`}</p>
                  </div>
                  <p className='is-centered'>{`For Sale: ${
                    item.forSale ? 'Yes' : 'No'
                  }`}</p>

                  {item.forSale && (
                    <div className='field'>
                      <p className='column'>{item.salePrice}</p>
                    </div>
                  )}
                  <footer className='card-footer'>
                    <Link
                      to={`/item-edit?itemId=${item._id}`}
                      className='card-footer-item has-text-black'
                      style={{ backgroundColor: colorPalette.BABYBLUE }}
                      onClick={() => handleEditClick(item)}>
                      Edit
                    </Link>
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
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Item;


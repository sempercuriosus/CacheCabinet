import React, { useState, useEffect } from 'react';

import '../../src/assets/CabinetPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import colorPalette from '../utils/colorPalette';
import DeleteItem from './DeleteItem';
import { GET_COLLECTION } from '../utils/queries';
import '../../src/assets/home.css';

function Item() {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_COLLECTION, {
    variables: { collectionId },
  });

  // Modal

  // Open
  const openModal = (serviceType) => {
    setIsModalActive(true);
  };

  // Close
  const closeModal = () => {
    setIsModalActive(false);
  };

  // Effect
  useEffect(() => {
    // Modal ESC Button
    const handleEsc = (event) => {
      console.log('Handling Escape key press');
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Loading
  if (loading) return <p>Loading...</p>;

  // Error
  if (error) return <p>Error: {error.message}</p>;

  // Items passed in from parent collection
  const items = data.getCollection.items;

  // Event Handlers

  // Add
  const handleAddItemClick = () => {
    navigate('/item/new?collectionId=' + collectionId);
  };

  // Edit
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

    // navigation to the item
    navigate('/item-edit?itemId=' + _id, {
      state: { _id, name, description, purchasePrice, dateAdded, imageData },
    });
  };

  // Delete
  const handleDeleteItem = async (itemId) => {
    try {
      console.log(itemId);

      // await DeleteItem({
      //   variables: {
      //     itemId: itemId,
      //   },
      // });

      // navigate(`/collection/${collectionId}`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteClick = (itemId) => {
    setSelectedItem(itemId);

    // Open Modal
    setIsModalActive(true);

    handleDeleteItem(itemId);
  };

  // Header Card Style
  const headerCardStyle = {
    maxWidth: '250px',
    border: 'solid black thin',
  };

  // Card Style
  const cardStyle = {
    margin: '1.5rem auto',
    border: 'solid black thin',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colorPalette.IVORY,
  };

  // Footer Style
  const deleteButtonStyle = {
    backgroundColor: colorPalette.IVORY,
    border: 'solid black thin',
    borderRadius: '6px',
    color: 'black',
  };

  const editButtonStyle = {
    backgroundColor: colorPalette.SAGE,
    border: 'solid black thin',
    borderRadius: '6px',
    color: 'black',
  };

  //  Component Start

  return (
    <>
      {/* Create Item Button */}
      <div
        className='box container has-text-centered'
        style={headerCardStyle}>
        <h2 className='title is-4'>Create an Item</h2>

        <button
          style={{ backgroundColor: colorPalette.BABYBLUE }}
          className='button 
          is-light 
          is-rounded 
          plus-button'
          onClick={handleAddItemClick}>
          <i className='material-icons'>add</i>
        </button>
      </div>

      {/* Columns */}
      <div className='columns is-multiline is-centered'>
        {/* Iterate over the items */}
        {items.map((item) => (
          // Column Definition
          <div
            className='column is-full-mobile
            is-two-thirds-tablet
            is-half-desktop
            is-one-third-widescreen
            is-one-quarter-fullhd'
            key={item._id}
            style={{
              marginBottom: '25px',
            }}>
            {/* Card  */}
            <div
              className='card'
              style={cardStyle}>
              {/* Card Title */}
              <header className='card-header block'>
                <h2 className='card-header-title title is-5'>{item.name}</h2>
              </header>

             {/* Image */}
                {/* <div className='card-image'>
                  <figure className='image is-1by4'>
                    {/* Display image from base64 encoded data */}
                    {/* <img
                    src={item.imageData ? `data:image/jpeg;base64, ${item.imageData}` : 'https://bulma.io/images/placeholders/1280x960.png'}
                    alt='Item Image Preview'
                    />
                  </figure>
                </div> */}

              {/* Card Content */}
              <div
                className='card-content'
                style={{
                  height: '100%',
                }}>
                <div className='content'>
                  <p className='card-header-subtitle'>
                    {item.description ? item.description : ''}
                  </p>
                  {/* Description */}

                  {/* Date Added*/}
                  {/* <p>{`Date Added: ${item.dateAdded}`}</p> */}

                  {/* Purchase Price */}
                  <p>{`Purchase Price: $ ${item.purchasePrice}`}</p>

                  {/* For Sale */}

                  {/* CONDITIONAL ITEMS */}
                  {item.forSale && (
                    // Columns

                    <div className='columns'>
                      {/* For Sale */}
                      <p className='column is-half'>{`For Sale: ${
                        item.forSale ? '✔' : ''
                      }`}</p>

                      {/* Sale Price */}
                      <p className='column is-half'>{`Selling For: $ ${item.salePrice}`}</p>
                    </div>
                  )}

                  {/*  */}
                </div>
              </div>

              {/* Card Footer */}
              <footer className='card-footer'>
                {/* Columns */}
                <div className='card-footer-item columns'>
                  {/* Column */}
                  <div className='column is-two-thirds'>
                    {/* Edit */}
                    <a
                      className='card-footer-item button'
                      style={editButtonStyle}
                      onClick={() => handleEditClick(item)}>
                      Edit
                    </a>
                  </div>

                  {/* Column */}
                  <div className='column'>
                    {/* Delete */}
                    <a
                      className='card-footer-item button'
                      style={deleteButtonStyle}
                      onClick={() => handleDeleteClick(item._id)}>
                      Delete
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Item */}
      {/* IF there is a selected item AND the modal is active THEN render the modal */}
      {selectedItem && isModalActive && (
        <div className='modal is-active'>
          {/* Modal Overlay */}
          <div
            className='modal-background'
            onClick={closeModal}></div>

          {/* Modal Close Button */}
          <button
            className='modal-close'
            aria-label='close'
            onClick={closeModal}></button>

          {/* Modal Content */}
          <div className='box modal-content'>
            <DeleteItem
              itemId={selectedItem}
              collectionId={collectionId}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Item;


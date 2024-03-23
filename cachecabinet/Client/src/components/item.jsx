import React, { useState, Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import colorPalette from '../utils/colorPalette';
import DeleteItem from './DeleteItem';
import { GET_COLLECTION } from '../utils/queries';

function Item() {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_COLLECTION, {
    variables: { collectionId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const items = data.getCollection.items;

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

  const handleDeleteItem = async (itemId, updateItems) => {
    try {
      await DeleteItem({
        variables: {
          itemId: itemId,
        },
      });
      onClose();
      navigate(`/collection/${collectionId}`);

      updateItems(itemList.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  const handleDeleteClick = (itemId) => {
    setSelectedItem(itemId);
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
                    {/* added the handleDeleteClick function to onClick */}
                    <a
                      href='#'
                      className='card-footer-item has-text-black'
                      style={{ backgroundColor: colorPalette.DUSTYROSE }}
                      onClick={() => handleDeleteClick(item._id)}>
                      Delete
                    </a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*added the render DeleteItem component conitionally */}
      {selectedItem && (
        <DeleteItem 
          itemId={selectedItem} 
          collectionId={collectionId} 
          onClose={() => setSelectedItem(null)}
        />
      )}
    </Fragment>
  );
}

export default Item;


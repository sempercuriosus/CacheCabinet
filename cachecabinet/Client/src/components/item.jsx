import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import colorPalette from '../utils/colorPalette';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Item({ items }) {
  const navigate = useNavigate();

  const { collectionId } = useParams();

  console.log('COLLECTION ID', collectionId);

  const [selectedItem, setSelectedItem] = useState(null);

  // Access the itemID from the route parameters
  // const { itemID } = useParams();

  // const { loading, error, data } = useQuery(GET_ITEM);

  const [isVisible, setIsVisible] = useState(true);

  // if (error) {
  //   return `Error! ${error.message}`;
  // }

  // if (loading) {
  //   return <h1 className='title is-3'>Loading...</h1>;
  // }

  const handleViewClick = (item) => {
    // set the state

    setSelectedItem(item);

    navigate(`/item/${item._id}`);
  };

  const handleAddItemClick = () => {
    navigate('/item/new?collectionId=' + collectionId);
  };

  const handleDelete = () => {
    const confirmed = Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
    if (confirmed) {
      setIsVisible(false);
    }
  };

  return (
    <section className='container'>
      <div
        className='box has-text-centered'
        style={{ maxWidth: '400px' }}>
        <h2 className='title is-4'>Create Item</h2>
        <div className='is-flex is-justify-content-flex-end'>
          <button
            style={{ backgroundColor: colorPalette.SAGE }}
            className='button is-light is-rounded plus-button'
            onClick={handleAddItemClick}>
            +
          </button>
        </div>
      </div>
      <div className='block'></div>
      {items.map((item) => (
        <div
          className='card block'
          key={item._id}
          style={{
            backgroundColor: colorPalette.IVORY,
            maxWidth: '400px',
          }}>
          <div className='card-image'>
            {/* <figure className='image is-4by3'>
              <img
                src={
                  item.imageData ||
                  'https://bulma.io/images/placeholders/1280x960.png'
                }
                alt='Item Image'
              />
            </figure> */}
          </div>
          <div className='card-content'>
            <h2
              className='title is-4'
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
                <p className='column is-half'>
                  <strong>Purchase Price:</strong> $ {item.purchasePrice}
                </p>
                <p className='column is-half'>
                  <strong>Date Added:</strong> {item.dateAdded}
                </p>
              </div>
              <p className='is-centered'>
                <strong>For Sale: </strong>
                {item.forSale ? 'Yes' : 'No'}
              </p>

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
                  onClick={handleDelete}>
                  Delete
                </a>
              </footer>
            </div>
          </div>
          {/* Card End */}
        </div>
      ))}
    </section>
  );
}

export default Item;


import { Fragment } from 'react';
/**
 * @component Item
 * @description This is a single-item the user wishes to track in a collection
 * @returns One Item's details
 */
function Item() {
  return (
    <Fragment>
      <h2>Item Name</h2>
      <h3>Item Description</h3>
      <p>Item Date Added</p>
      <p>Item For Sale</p>
      <p>Item Quantity</p>
      <img
        src=''
        alt='Preview of Item'>
        [ Image Here ]
      </img>
    </Fragment>
  );
}

export default Item;


import { Fragment } from 'react';
import { Item } from '../item/item';
/**
 * @component Collection_One
 * @description Has a list of the Components with a list of the Items
 * @returns A single Collection
 */
function Collection_One() {
  return (
    <Fragment>
      <h2>Collection Name</h2>
      <h3>Collection description</h3>
      <Item />
    </Fragment>
  );
}

export default Collection_One;


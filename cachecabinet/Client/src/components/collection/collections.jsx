import { Fragment } from 'react';
/*
 * Collection of all Collections, for a user, will need to have
 * auth, when ready
 * get from the db all of the collections a user has
 * * that will need a mutation/query for those
 * * also will need the cooresponding typedef and resolver
 * This only will show the Name and Description of the Colllections
 */

/**
 * @component Collection All
 * @description This will display all of the Collections, with name and description, for a given user.
 * @returns Collection All Component
 */
function Collections() {
  return (
    <Fragment>
      <p> Collection_All Display Test </p>
    </Fragment>
  );
}

export default Collections;


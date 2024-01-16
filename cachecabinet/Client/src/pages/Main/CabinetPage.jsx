import React, { useState, Fragment } from 'react';
import CreateCollection from '../../components/CreateCollection';
import Collection from '../../components/collection';
import '../../assets/CabinetPage.css';
import { useQuery } from '@apollo/client';
import { GET_USER_ASSIGNMENTS } from '../../utils/queries';
import DisplayError from '../../components/Error/DisplayError';

export default function Home() {
  const [collections, setCollections] = useState([]);

  const handleAddCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
    refetch();
  };

  const { loading, error, data, refetch } = useQuery(GET_USER_ASSIGNMENTS);

  // reretch

  if (error) {
    return <DisplayError />;
    //return <section className='section'>`Error! ${error.message}`;</section>;
  }

  if (loading) {
    return <h1 className='title is-3'>Loading...</h1>;
  }

  if (data) {
    const collections = data.getUserAssignments;

    return (
      <Fragment>
        <div
          className=''
          style={{ position: 'relative', bottom: '30px' }}>
          <div className='columns is-mobile'>
            <div
              className='column'
              style={{ margin: '20px' }}>
              <CreateCollection onAddCollection={handleAddCollection} />
            </div>
          </div>
          <div className='columns is-multiline'>
            <div className='column'>
              <Collection userCollections={collections} />
            </div>
          </div>
        </div>
        {/* <div
          className='logout-container'
          style={{ position: 'fixed', top: '10px', right: '10px' }}>
          <Logout />
        </div> */}
      </Fragment>
    );
  }
}


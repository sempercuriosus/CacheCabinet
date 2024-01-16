import React, { useState } from 'react';
import CreateCollection from '../../components/CreateCollection';
import Collection from '../../components/collection';
import Logout from '../../components/Logout';
import '../../assets/CabinetPage.css';
import { useQuery } from '@apollo/client';
import { GET_USER_ASSIGNMENTS } from '../../utils/queries';

export default function Home() {
  const [collections, setCollections] = useState([]);

  const handleAddCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
  };

  const { loading, error, data } = useQuery(GET_USER_ASSIGNMENTS);

  if (error) {
    return (
      <div className='error-container'>
        <p>Error! {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return <h1 className='title is-3'>Loading...</h1>;
  }

  if (data) {
    const collections = data.getUserAssignments;

    return (
      <div className='hero is-fullheight'>
        <div
          className='hero-body'
          style={{ position: 'relative', bottom: '30px' }}>
          <div className='columns is-centered is-mobile'>
            <div
              className='column'
              style={{ margin: '20px', paddingRight: '40px' }}>
              <CreateCollection onAddCollection={handleAddCollection} />
            </div>
          </div>
          <div className='columns'>
            <div>
              <Collection userCollections={collections} />
            </div>
          </div>
        </div>
        <div
          className='logout-container'
          style={{ position: 'fixed', top: '10px', right: '10px' }}>
          <Logout />
        </div>
      </div>
    );
  }
}

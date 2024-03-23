import React, { useState } from 'react';
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
      <>
        <div className='container block'>
          <CreateCollection onAddCollection={handleAddCollection} />
        </div>

        <div className='columns is-multiline is-centered'>
          <Collection userCollections={collections} />
        </div>
      </>
    );
  }
}


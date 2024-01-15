import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import CreateCollection from '../../components/CreateCollection';
import Collection from '../../components/collection';
import Logout from '../../components/Logout';
import '../../assets/CabinetPage.css';
import AuthService from '../../utils/auth';

export default function Home() {
  const [collections, setCollections] = useState([]);

  const handleAddCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
  };
  

  if (!AuthService.loggedIn || AuthService.isTokenExpired()) {
    return <Navigate to="/" />;
  }

  if (AuthService.loggedIn) {
  return (
    <div className='hero is-fullheight'>
      <div className='hero-body' style={{ position: 'relative', bottom: '30px' }}>
        <div className='columns is-centered is-mobile'>
          <div className='column' style={{ margin: '40px' }}>
            <CreateCollection onAddCollection={handleAddCollection} />
          </div>
        </div>
        <div className='columns is-multiline'>
          {collections.map((collection, index) => (
            <div className='column is-6' key={index}>
              <Collection {...collection} />
            </div>
          ))}
        </div>
      </div>
      <div className='logout-container' style={{ position: 'fixed', top: '50px', right: '20px' }}>
        <Logout />
      </div>
    </div>
  );
}
}

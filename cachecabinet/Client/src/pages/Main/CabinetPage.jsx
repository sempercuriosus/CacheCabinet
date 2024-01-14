import React, { useState } from 'react';
import CreateCollection from '../../components/CreateCollection';
import Collection from '../../components/Collection';
import Logout from '../../components/Logout';
import '../../assets/CabinetPage.css';

export default function Home() {
  const [collections, setCollections] = useState([]);

  const handleAddCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
  };

  return (
    <div className="hero is-fullheight">
      <div className="hero-body" style={{position: 'relative', bottom: '30px'}}>
        <div className="columns is-centered is-mobile">
          <div className="column" style={{ margin: '40px' }}>
            <CreateCollection onAddCollection={handleAddCollection} />
          </div>
        </div>
        <div className="columns is-multiline">
          {collections.map((collection, index) => (
            <div className="column is-6" key={index}>
              <Collection {...collection} />
            </div>
          ))}
        </div>
      </div>
      <div className="logout-container" style={{ position: 'fixed', top: '10px', right: '10px' }}>
        <Logout />
      </div>
    </div>
  );
}

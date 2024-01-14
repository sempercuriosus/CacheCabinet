import React from 'react';
import Login from '../../components/Login';
import Register from '../../components/Register';
import '../../assets/home.css';

export default function Home() {
  return (
    <div className='hero is-fullheight'>
      <div className='hero-body'>
        <div className='columns is-centered is-mobile'>
          <div className='column is-5 is-mobile'>
            <h1 className='title is-1 has-text-centered'>CacheCabinet</h1>
            <p className='subtitle is-3 has-text-centered'>
              Organize your Life, one Collection at a time.
            </p>
          </div>
          <div className='column'>
            <Login />
          </div>
          <div className='column'>
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import Login from '../../components/Login';
import Register from '../../components/Register';
import '../../assets/home.css';

export default function Home() {
  return (
    <div className='hero'>
      <div className='hero-head'>
        <h1 className='title has-text-centered'>CacheCabinet</h1>
        <p className='subtitle has-text-centered'>
          Organize your Life, one Collection at a time.
        </p>
      </div>

      <div className='hero-body'>
        <div className='columns is-centered'>
          <div className='column is-mobile-full is-half'>
            <Login />
          </div>
          <div className='column is-mobile-full is-half'>
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
}


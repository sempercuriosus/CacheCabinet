import React from 'react';
import Login from '../../components/Login';
import leftDesign from '../../assets/leftdesign.png'; // Import left image
import rightDesign from '../../assets/rightdesign.png'; // Import right image
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
          <div className='column'>
            <img src={leftDesign} alt='Left Image' className='leftdesign'/>
          </div>
          
          <div className='column is-mobile-full'>
            <Login />
          </div>

          <div className='column'>
            <img src={rightDesign} alt='Right Image' className='rightdesign'/>
          </div>
        </div>
      </div>
    </div>
  );
}

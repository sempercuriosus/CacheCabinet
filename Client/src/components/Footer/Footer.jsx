import React from 'react';
import '../../assets/home.css';

const Footer = () => {
  return (
    <footer
      className='footer'
      style={{ backgroundColor: '#E4C9B6', marginTop: '-80px' }}>
      <div className='content has-text-centered'>
        <p>
          Created by <strong>Eric Hulse</strong>, <strong>Keith Primas</strong>,{' and '}
          <strong>Nohemi Moser</strong>
          <br />
          with 🧡 and ☕️
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import '../../assets/home.css';

const Footer = () => {
  return (
    <footer
      className='footer'
      style={{ backgroundColor: '#E4C9B6'}}>
      <div className='content has-text-centered'>
        <p>
          Created by{' '}
          <strong>
            <a href="https://github.com/sempercuriosus">Eric Hulse</a>
          </strong>,{' '}
          <strong>
            <a href="https://github.com/keithprimas">Keith Primas</a>
          </strong>,{' '}
          and{' '}
          <strong>
            <a href="https://github.com/NemiMoser">Nohemi Moser</a>
          </strong>
          <br />
          with 🧡 and ☕️
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, Fragment } from 'react';

function DisplayError() {
  return (
    <section className='section'>
      <div className='card block '>
        <div className='card-content title is-5'>
          There was an issue with the application.
        </div>
        <div className='card-content subtitle is-5'>Please Try again.</div>
      </div>
    </section>
  );
}

export default DisplayError;


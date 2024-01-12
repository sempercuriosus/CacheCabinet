import { Fragment } from 'react';

function ErrorPage() {
  return (
    <Fragment>
      <section className='content'>
        <h1 className='title'>Route Was Not Found</h1>
        <h3 className='title is-3'>
          The Route that you have tried to access was not found. Please try
          again.
        </h3>
      </section>
    </Fragment>
  );
}

export default ErrorPage;


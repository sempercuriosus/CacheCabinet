import { Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ErrorPage() {
  return (
    <Fragment>
      <Header />
      <section className='card'>
        <div className='card-header-title is-centered title'>
          🚨 Route Was Not Found 🚨
        </div>
        <hr />
        <div className='card-content'>
          <div className='subtitle is-4'>
            The page that you have tried to access was not found
          </div>
          <div className='subtitle is-4'>Please try again</div>
          <br />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default ErrorPage;


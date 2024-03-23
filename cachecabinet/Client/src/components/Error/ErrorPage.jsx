import { Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ErrorPage() {
  return (
    <Fragment>
      <Header />
      <section className='container box block'>
        <div className='section'>
          <div className='title has-text-centered'>
            🚨 Route Was Not Found 🚨
          </div>

          <div className=''>
            <div className='subtitle is-4'>
              The page that you have tried to access was not found
            </div>
            <div className='subtitle is-4'>Please try again</div>
          </div>
        </div>
      </section>
      <br />
      <Footer />
    </Fragment>
  );
}

export default ErrorPage;


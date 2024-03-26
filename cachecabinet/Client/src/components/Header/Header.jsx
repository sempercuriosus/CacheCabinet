import React, { Fragment } from 'react';
import Navbar from '../../components/Nav';
import AuthService from '../../utils/auth';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      <header className='level block'>
        <Navbar />
        {isLoggedIn && (
          // renders logout if user is logged in
          <button onClick={handleLogout}>Logout</button>
        )}
      </header>

      <br />
    </Fragment>
  );
};

export default Header;


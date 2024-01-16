import React from 'react';
import AuthService from '../utils/auth';

const Logout = () => {

  const handleLogout = () => {
    AuthService.logout();  // Include parentheses to call the logout method
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout;

    // After logout, navigate back to the login page
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
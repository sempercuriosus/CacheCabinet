import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import { Link } from 'react-router-dom';
import '../../src/assets/home.css';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      AuthService.login(token);
    } catch (e) {
      alert('Incorrect email or password.');
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className=''>
      <form
        className='login'
        onSubmit={handleFormSubmit}>
        <h1 className='title is-4'>Login</h1>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control'>
            <input
              className='input'
              type='email'
              placeholder='Enter your email'
              name='email'
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              className='input'
              type='password'
              placeholder='Enter your password'
              name='password'
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <button
              type='submit'
              className='button is-success mb-2'>
              <Link
                to='/main'
                className='has-text-white'>
                Login
              </Link>
            </button>
          </div>
        </div>
      </form>
      <div>
      <Link
        to='/register'
        className='has-text-white is-size-4' style={{ textDecoration: 'underline' }}>
        Register
      </Link>
      </div>
    </div>
  );
}

export default Login;


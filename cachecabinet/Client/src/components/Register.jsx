import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import { Link } from 'react-router-dom';
import '../../src/assets/home.css';

function Register(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    AuthService.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const goBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className=''>
      <div className='columns is-centered'>
      <form
        className='register'
        onSubmit={handleFormSubmit}>
        <h1 className='title is-4'>Register</h1>
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
          <label className='label'>Password (minimum 8 char)</label>
          <div className='control'>
            <input
              className='input'
              type='password'
              name='password'
              placeholder='Enter your password'
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <button
              type='submit'
              className='button is-success'>
              <Link
                to='/main'
                className='has-text-white'>
                Register
              </Link>
            </button>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <button
              type='button'
              className='button is-info'
              onClick={goBack}>
              Go back
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Register;

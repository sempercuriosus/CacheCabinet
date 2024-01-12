import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import { Link } from 'react-router-dom';


function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN_USER);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        AuthService.login(token);
      } catch (e) {
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
        <form className="login" onSubmit={handleFormSubmit}>
            <h1>Login</h1>
                <input 
                type="email" 
                placeholder="email"
                name="email"
                onChange={handleChange}>
                </input>
                <input 
                type="password" 
                placeholder="password"
                name="password"
                onChange={handleChange}>
                </input>
                <button type='submit'><Link to='/login'>Login</Link></button>
        </form>
    );
}

export default Login;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import AuthService from '../../utils/auth';

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
  

    return (
        <form className="register" onSubmit={handleFormSubmit}>
            <h1>Register</h1>
                <input 
                type="email" 
                placeholder="email"
                name="email"
                onChange={handleChange}>
                </input>
                <input 
                type="password" 
                name="password"
                placeholder="password"
                onChange={handleChange}>
                </input>
            <button>Register</button>
        </form>
    );
}

export default Register;
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    
    //uncomment to test with this dummy user/password
//    const storedEmail= 'nohemi.moser@gmail.com';
//    const storedPassword = 'Password2345';

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await fetch(
              isRegistering ? '/api/register' : '/api/login',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
              }
            );
            const data = await response.json();
            console.log(data);

            if (isRegistering) {
                navigate('/dashboard');
              } else {
                if (response.ok) {
                  navigate('/dashboard');
                } 
              }
            } catch (error) {
                console.error('Error:', error);
              }
    };

    return (
        <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'New user? Register here'}
      </p>
    </div>
    );
};

export default Home;
import { useState } from 'react';
// import { connection } from '/Server/config/connection.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch(`${connection.apiUrl}/register`, 
        {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.status === 200) {
            alert('register successful');
        } else {
            alert('registration failed');
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
            placeholder="email" 
            value={email}
            onChange={ev => setEmail(ev.target.value)}></input>
            <input type="password" 
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}></input>
            <button>Register</button>
        </form>
    );
}
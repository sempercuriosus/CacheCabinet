import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login',
        {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('incorrect email or password');
        }
    }

    if (redirect){
        return <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
            placeholder="email"
            value={email}
            onChange={ev => setEmail(ev.target.value)}></input>
            <input type="password" 
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}></input>
            <button>Login</button>
        </form>
    );
}

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', 
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
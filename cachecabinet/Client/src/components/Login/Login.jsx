import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// import { connection } from '/Server/config/connection.js';

import {useMutation} from '@apollo/client';

import {LOGIN} from '../../schema/Auth';

export default function LoginPage()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [goLogin, {loginError, loginData}] = useMutation(LOGIN);

    async function login(ev)
    {
        ev.preventDefault();

        goLogin({
            variables: {
                username: email,
                password: password
            }
        }).then((res) => {
            console.log('get back login res.', res);
            //localStorage.setItem('id_token', res.token);
        }).catch(() => {})



        /*
        const response = await fetch(`${connection.apiUrl}/login`,
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
        */


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
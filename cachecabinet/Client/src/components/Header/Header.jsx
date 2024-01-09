import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <main>
            <Link to="/" className="logo">CacheCabinet</Link>
            <nav>
                <Link to="/">Log in</Link>
                <Link to="/">Register</Link>
                <Link to="/logout">Sign out</Link>
            </nav>
        </main>
    )
};

export default Header;

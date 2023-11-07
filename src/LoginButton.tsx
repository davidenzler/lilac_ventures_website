import React from 'react';
import { Link } from 'react-router-dom';


export function LoginButton() {
    // Call API service to logout user.
    return (
        <li className='nav-text'>
            <Link to={"/login"}>
                <span>Login</span>
            </Link>
        </li>
    );
}
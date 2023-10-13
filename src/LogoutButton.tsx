import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from './services/logoutService'


export function LogoutButton() {
    // Call API service to logout user.
    logout();
    return (
        <li className='nav-text'>
            <Link to={"/"}>
                <span>Logout</span>
            </Link>
        </li>
    );
}
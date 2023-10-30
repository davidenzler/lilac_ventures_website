import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from './hooks/useLogout';

type ClickEvent = {
    ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function LogoutButton() {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async() => {
        await logout();
        navigate('/');
    }

    return (
        <button onClick={signOut}>
            <span>Logout</span>
        </button>
    );
}
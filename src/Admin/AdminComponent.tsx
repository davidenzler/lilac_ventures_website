import React from 'react';
import '../Admin/adminPortal.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { LogoutButton } from '../LogoutButton';


export default function AdminComponent() {
    const navigate = useNavigate();
    const logout = useLogout();
    
    return(
        <main className='adminPortal'>
            <section className='adminNavigation'>
                <ul>
                    <li>
                        <Link to="AdminOverview">Overview</Link>
                    </li>
                    <li>
                        <Link to="Invoice">Create Invoice</Link>
                    </li>
                    <li>
                        <Link to="adminTable">Customer List</Link>
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            </section>
            <section className='currentAdminView'>
                <Outlet/>
            </section>
        </main>
    );
}
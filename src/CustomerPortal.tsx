import React from 'react';
import ProgressBar from './ProgressBar';
import "./customerPortal.css"
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Inbox from './Inbox';
import AvailableForm from './AvailableForm';
import useLogout from './hooks/useLogout';
import { LogoutButton } from './LogoutButton';
import useAuth from './hooks/useAuth';

function CustomerPortal(){

    const navigate = useNavigate();
    const logout = useLogout();
    const { auth }:any = useAuth();
    const signOut = async() => {
        await logout();
        navigate('/');
    }

    return (

        <div className='container'>
            <div className='sidebar'>
                <div className='sideHeader'>My Coaching</div>
                <div className='sideSelection'>
                    <Link to="./">My Progress</Link>
                </div>
                <div className='sideSelection'>
                    <Link to="messages">Messages</Link>
                </div>
                <div className='sideSelection'>
                    <Link to="calendar">Calendar</Link>
                </div>
                <div className='sideHeader'>Documents</div>
                    <div className='sideSelection'>
                        <Link to="forms">Available Forms</Link>
                    </div>
                    <div className='sideSelection'>
                        <Link to="uploadedDocuments">Uploaded Documents</Link>
                    </div>
                <div className='sideHeader'>Invoices/Payments</div>
                    <div className='sideSelection'>
                        <Link to="invoices">Invoices</Link>
                    </div>
                <div className='sideHeader'>Account Management</div>
                <div className='sideSelection'>
                    <Link to="CustomerAccount">Customer Account</Link>
                </div>
                <div className='logoutButton'>
                        <LogoutButton />
                </div>
            </div>

            <div id='portalbody'>
                <Outlet/>
            </div>
        </div>
      );
}

export default CustomerPortal;
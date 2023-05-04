import React from 'react';
import ProgressBar from './ProgressBar';
import "./customerPortal.css"
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Inbox from './Inbox';
import AvailableForm from './AvailableForm';

function CustomerPortal(){
    return (

        <div className='container'>
        <div className='sidebar'>
            <div className='sideHeader'>My Coaching</div>
                <div className='sideSelection'>
                    <li>
                        <Link to="progress">My Progress</Link>
                    </li>
                </div>
                <div className='sideSelection'>
                    <li>
                        <Link to="messages">Messages</Link>
                    </li>
                </div>
                <div className='sideSelection'>
                    <a href='#'>Calendar</a><br></br>
                </div>
            <div className='sideHeader'>Documents</div>
                <div className='sideSelection'>
                    <li>
                        <Link to="forms">Available Forms</Link>
                    </li>
                </div>
                <div className='sideSelection'>
                    <a href='#'>Uploaded Documents</a><br></br>
                </div>
            <div className='sideHeader'>Invoices/Payments</div>
                <div className='sideSelection'>
                    <a href='#'>Invoices</a><br></br>
                </div>
                <div className='sideSelection'>
                    <a href='#'>Make a Payment</a><br></br>
                </div>
            <div className='sideHeader'>Account Management</div>
                <div className='sideSelection'>
                    <li>
                        <Link to="CustomerAccount">Customer Account</Link>
                    </li>
                </div>
                <div className='sideSelection'>
                    <a href='#'>Contact Information</a><br></br>
                </div>
                <div className='sideSelection'>
                    <a href='#'>Additional Records</a><br></br>
                </div>
        </div>

        <div className='body'>
            <Outlet/>
        </div>
        </div>
      );
}

export default CustomerPortal;
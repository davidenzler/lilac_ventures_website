import React from 'react';
import "./RegistrationForm.css";
import {useState, useEffect, useRef} from 'react';
import { Button } from 'react-bootstrap';
import PasswordGenerator from './PasswordGenerator'

function RegistrationForm(this: any){
    
    const[marital, setMarital] = React.useState('');
    const[employment, setEmployment] = React.useState('');

    const handleMaritalChange = (marital: React.SetStateAction<string>) => {
        setMarital(marital);
        console.log(marital);
    }

    const handleEmployment = (employment: React.SetStateAction<string>) =>{
        setEmployment(employment);
        console.log(employment);
    }

    return(
        <div className="wrapper">
            <div className="form">
                <h3 className="title">CREATE A NEW USER</h3>

                <form action='#' className='myform'>
                    <div className="control-from">
                        <label>First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            //value=""
                            placeholder='First Name'
                            required
                        />
                    </div>

                    <div className="conrol-from">
                        <label>Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            //value=""
                            placeholder='Last Name'
                            required
                        />
                    </div>

                    <div className="control-from">
                        <label>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            //value=""
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div className='control-from'>
                        <label>Phone Number</label>
                        <input
                            type="number"
                            id="phonenumber"
                            //value=""
                            placeholder='Phone Number'
                            required
                            
                        />
                    </div>

                    <div className="full-width">
                        <label>Address</label>
                        <input
                            type="text"
                            id="street"
                            //value=""
                            placeholder='Street'
                            required
                        />
                    </div>

                    <div className="control-from">
                        <input
                            type="text"
                            id="city"
                            //value=""
                            placeholder="City"
                            required
                        />
                    </div>

                    <div className="control-from">
                        <input
                            type="text"
                            id="state"
                            //value=""
                            placeholder='State (Please write whole state name)'
                            required
                        />
                    </div>

                    <div className="conrotl-from">
                        <input
                            type="number"
                            id="zip"
                            //value=""
                            placeholder='Zip Code'
                            required
                        />
                    </div>

                    <div className='contact-from'></div>

                    <div className='contact-from'>
                        <label>Marital Status</label>
                        <select name="marital" value={marital} onChange={event => handleMaritalChange(event.target.value)}>
                            <option id='0'>Married</option>
                            <option id='1'>Single</option>
                        </select>
                    </div>

                    <div className='contact-from'>
                        <label>Employment Status</label>
                        <select name="employmnet" value={employment} onChange={event => handleEmployment(event.target.value)}>
                            <option id='0'>Employed</option>
                            <option id='1'>Unemployed</option>
                        </select>
                    </div>

                    <div className="full-width">
                        <label>Contact Preference</label>
                        <input
                            type="text"
                            id="preference"
                            //value=""
                            placeholder="Please type Email or Phone"
                            required
                        />
                    </div>
                   
                    <div className='full-width'>
                    <PasswordGenerator></PasswordGenerator>
                    </div>

                    <div className="button">
                        <button id="create">CREATE</button>
                    </div>
                </form>
            </div>
        </div>
         

    );
    
}

export default RegistrationForm;
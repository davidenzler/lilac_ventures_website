import React from 'react';
import "./RegistrationForm.css";
import {useState, useEffect, useRef} from 'react';
import { Button } from 'react-bootstrap';
import PasswordGenerator from './PasswordGenerator'
import axios from './api/axios'
import { register } from './services/RegisterService';
import { addClient } from './services/ClientService';

function RegistrationForm(this: any){
    
    const[marital, setMarital] = React.useState('');
    const[employment, setEmployment] = React.useState('');

    const[data, setData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        street:'',
        city:'',
        state:'',
        zip:'',
        marital:'',
        employment:'',
        cPreference:''

    })

    const createUser = async (e: any) => {
        e.prevetDefault();
        const {firstName, lastName, email, phone, street, city, state, zip, marital, employment, cPreference} = data;
        try{
            await axios.post('http://127.0.0.1:8080/register', {
                firstName,
                lastName,
                email,
                phone,
                street,
                city,
                state,
                zip,
                marital,
                employment,
                cPreference
                //alert("Registraiton successful");
            })
            alert("Registration Failed")
        } catch(error){
            alert("Registration Failed")
            console.log(error)
        }
    }

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
                            onChange = {(e) => setData({...data, firstName: e.target.value})}
                            value={data.firstName}
                            type="text"
                            id="firstName"
                            //value=""
                            placeholder='First Name'
                            required
                        />
                    </div>
                    
                    <div className="conrol-from">
                        <label>Last Name</label>
                        <input
                            onChange = {(e) => setData({...data, lastName: e.target.value})}
                            value={data.lastName}
                            type="text"
                            id="lastName"
                            //value=""
                            placeholder='Last Name'
                            required
                        />
                    </div>

                    <div className="control-from">
                        <label>Email Address</label>
                        <input
                            onChange = {(e) => setData({...data, email: e.target.value})}
                            value={data.email}
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
                            onChange={(e) => setData({...data, phone: e.target.value})}
                            value={data.phone}
                            type="number"
                            id="phone"
                            //value=""
                            placeholder='Phone Number'
                            required
                            
                        />
                    </div>

                    <div className="full-width">
                        <label>Address</label>
                        <input
                            onChange = {(e) => ({...data, street: e.target.value})}
                            value={data.street}
                            type="text"
                            id="street"
                            //value=""
                            placeholder='Street'
                            required
                        />
                    </div>

                    <div className="control-from">
                        <input
                            onChange = {(e) => ({...data, city: e.target.value})}
                            value={data.city}
                            type="text"
                            id="city"
                            //value=""
                            placeholder="City"
                            required
                        />
                    </div>

                    <div className="control-from">
                        <input
                            onChange = {(e) => ({...data, state: e.target.value})}
                            value={data.state}
                            type="text"
                            id="state"
                            //value=""
                            placeholder='State (Please write whole state name)'
                            required
                        />
                    </div>

                    <div className="conrotl-from">
                        <input
                            onChange = {(e) => ({...data, zip: e.target.value})}
                            value={data.zip}
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
                        <select name="marital" value={data.marital} onChange={event => handleMaritalChange(event.target.value)}>
                            <option id='0'>Married</option>
                            <option id='1'>Single</option>
                        </select>
                    </div>

                    <div className='contact-from'>
                        <label>Employment Status</label>
                        <select name="employment" value={data.employment} onChange={event => handleEmployment(event.target.value)}>
                            <option id='0'>Employed</option>
                            <option id='1'>Unemployed</option>
                        </select>
                    </div>

                    <div className="full-width">
                        <label>Contact Preference</label>
                        <input
                            onChange = {(e) => ({...data, cPreference: e.target.value })}
                            value={data.cPreference}
                            type="text"
                            id="cPreference"
                            //value=""
                            placeholder="Please type Email or Phone"
                            required
                        />
                    </div>
                   
                    <div className='full-width'>
                    <PasswordGenerator></PasswordGenerator>
                    </div>

                    <div className="button">
                        <button 
                        onClick={(e) => {
                            alert('User Created');
                            createUser(e);
                            console.log(data);
                        }}
                        id="create">CREATE</button>
                    </div>
                </form>
            </div>
        </div>
         

    );
    
}

export default RegistrationForm;


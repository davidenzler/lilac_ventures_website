import React, {useState, useEffect} from 'react';
import "./CustomerInfoView.css";
import axios from './api/axios'


function CustomerInfoView(){

    const [client, setClient] = useState({
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

    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch('http://127.0.0.1:8080/clientInfoUpdate/clientDetails/:clientEmail')
            const json = await response.json()

            if(response.ok){
                setClient(json)
            }
        }
        fetchClients()
    }, [])
    return(
        <form className = "user-info-container">
            <h1>Client Information</h1>
    
            <p className='text center'>First Name: {client.firstName}</p>  
            <p className='text center'>Last Name: {client.lastName}</p>
            <p className='text center'>Email: {client.email}</p>
            <p className='text center'>Phone: {client.phone}</p>
            <p className='text center'>Street: {client.street}</p>
            <p className='text center'>City: {client.city}</p>
            <p className='text center'>State: {client.state}</p>
            <p className='text center'>Zip: {client.zip}</p>
            <p className='text center'>Marital Status: {client.marital}</p>
            <p className='text center'>Employment Status: {client.employment}</p>
            <p className='text center'>Contact Preference: {client.cPreference}</p>
            

        </form>


    );

    }


export default CustomerInfoView;
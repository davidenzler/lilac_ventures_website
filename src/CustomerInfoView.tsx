import React, {useState, useEffect} from 'react';
import "./CustomerInfoView.css";
import axios from './api/axios'


function CustomerInfoView(){

   const[clients, setClients] = useState([])
   useEffect(()=> {
    axios.get('http://127.0.0.1:8000/getClients')
    .then(clients => setClients(clients.data))
    .catch(err => console.log(err))
   }, [])

    return(
        <form className = "user-info-container">
            <h1>Client Information</h1>
    
            <p className='text center'>First Name:</p>  
            <p className='text center'>Last Name:</p>
            <p className='text center'>Email:</p>
            <p className='text center'>Phone:</p>
            <p className='text center'>Street:</p>
            <p className='text center'>City:</p>
            <p className='text center'>State:</p>
            <p className='text center'>Zip:</p>
            <p className='text center'>Marital Status:</p>
            <p className='text center'>Employment Status:</p>
            <p className='text center'>Contact Preference:</p>
            

        </form>


    );

    }


export default CustomerInfoView;
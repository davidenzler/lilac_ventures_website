import React from 'react';
import "./RegistrationForm.css";
import {useState, useEffect, useRef} from 'react';
import axios, { axiosPrivate } from './api/axios'
import useAuth from "./hooks/useAuth";
import { addNewCustomer } from './services/customerServices';

function RegistrationForm(this: any){
    
    const containerStyle = { 
	maxWidth: "800px", 
	margin: "1rem", 
	padding: "20px", 
	border: "1px solid #ccc", 
	borderRadius: "8px", 
	boxShadow: "0px 0px 10px 0px grey", 
    }; 

    const inputContainerStyle = { 
	display: "flex", 
	alignItems: "center", 
	marginBottom: "10px", 
    }; 

    const labelStyle = { 
	flex: "1", 
    }; 

    const inputStyle = { 
	padding: "5px", 
	border: "1px solid #ccc", 
	borderRadius: "3px", 
    }; 

    const checkboxContainerStyle = { 
	display: "flex", 
	alignItems: "center", 
	marginBottom: "5px", 
    }; 

    const buttonStyle = { 
	padding: "10px 15px", 
	backgroundColor: "#007bff", 
	color: "#fff", 
	border: "none", 
	borderRadius: "5px", 
	cursor: "pointer", 
	transition: "background-color 0.2s ease-in-out", 
    }; 

    const copyButtonStyle = { 
	marginLeft: "10px", 
    }; 

    const [password, setPassword] = useState(''); 
	const [passwordLength, setPasswordLength] = useState(8); 
	const [useSymbols, setUseSymbols] = useState(true); 
	const [useNumbers, setUseNumbers] = useState(true); 
	const [useLowerCase, setUseLowerCase] = useState(true); 
	const [useUpperCase, setUseUpperCase] = useState(true); 
	const [successMessage, setSuccessMessage] = useState(""); 
    const { auth }: any = useAuth();

    const generatePassword = () => { 
		let charset = ""; 
		let newPassword = ""; 

		if (useSymbols) charset += "!@#$%^&*()"; 
		if (useNumbers) charset += "0123456789"; 
		if (useLowerCase) 
			charset += "abcdefghijklmnopqrstuvwxyz"; 
		if (useUpperCase) 
			charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 

		for (let i = 0; i < passwordLength; i++) { 
			newPassword += charset.charAt( 
				Math.floor(Math.random() * charset.length) 
			); 
		} 

		setPassword(() => newPassword); 
	}; 

    const copyToClipboard = () => { 
		const el = document.createElement("textarea"); 
		el.value = password; 
		document.body.appendChild(el); 
		el.select(); 
		document.execCommand("copy"); 
		document.body.removeChild(el); 
		setSuccessMessage("Password copied to clipboard!"); 
		setTimeout(() => setSuccessMessage(""), 5000); 
		// Hide message after 5 seconds 
	}; 
    

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
        e.preventDefault();
        const {firstName, lastName, email, phone, street, city, state, zip, marital, employment, cPreference} = data;
        try{
            await axios.post('http://127.0.0.1:8080/clientInfoUpdate/addClient', {
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
            })
            
            await axios.post('http://127.0.0.1:8080/register', {
                'user': email,
                'pwd': password
            })

            await addNewCustomer({
                'phone': data.phone,
                'email': data.email,
                'firstName': data.firstName,
                'lastName': data.lastName
            }, 
            auth.accessToken);
            await axiosPrivate.post('/contactMe/greeting',
            {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            },
            {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${auth.accessToken}`
                },
            });
            setData({
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
        
            });
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className="wrapper">
            <div className="form">
                <h3 className="title">CREATE USER FORM</h3>
                
                <div className='myform'>
                    <div className="control-from">
                        <label>First Name</label>
                        <input
                            onChange = {(e) => setData({...data, firstName: e.target.value})}
                            value={data.firstName}
                            type="text"
                            id="firstName"
                            placeholder='First Name'
                            required
                        />
                    </div>
                    
                    <div className="control-from">
                        <label>Last Name</label>
                        <input
                            onChange = {(e) => setData({...data, lastName: e.target.value})}
                            value={data.lastName}
                            type="text"
                            id="lastName"
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
                            placeholder='Phone Number'
                            required
                            
                        />
                    </div>

                    <div className="full-width control-from">
                        <label>Address</label>
                        <input
                            onChange = {(e) => setData({...data, street: e.target.value})}
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
                            onChange = {(e) => setData({...data, city: e.target.value})}
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
                            onChange = {(e) => setData({...data, state: e.target.value})}
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
                            onChange = {(e) => setData({...data, zip: e.target.value})}
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
                        <input
                            onChange = {(e) => setData({...data, marital: e.target.value})}
                            value={data.marital}
                            type="text"
                            id="zip"
                            //value=""
                            placeholder='Input Marital Status'
                            required
                        />
                    </div>

                    <div className='contact-from'>
                    <label>Employment Status</label>
                    <input
                            onChange = {(e) => setData({...data, employment: e.target.value})}
                            value={data.employment}
                            type="text"
                            id="zip"
                            //value=""
                            placeholder='Input Employment Status'
                            required
                        />
                    </div>

                    <div className="full-width">
                        <label>Contact Preference</label>
                        <input
                            onChange = {(e) => setData({...data, cPreference: e.target.value })}
                            value={data.cPreference}
                            type="text"
                            id="cPreference"
                            //value=""
                            placeholder="Please type Email or Phone"
                            required
                        />
                    </div>

                
                    <div className="full-width" style={containerStyle}> 
			        <h3 style={{ textAlign: "center" }}> 
				        Password Generator 
			        </h3> 
			        <div style={inputContainerStyle}> 
				        <label style={labelStyle}> 
					        Password Length: 
				        </label> 
				        <input 
                        //onChange={(e) => setPasswordLength(e.target.value)}
                         onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
                         value={passwordLength}
                         type="number"
                         min="8"
                         max="32"
                         style={inputStyle} 
				        /> 
			        </div> 
			<div style={checkboxContainerStyle}> 
				<label> 
					<input 
						type="checkbox"
						checked={useSymbols} 
						onChange={() => 
							setUseSymbols(!useSymbols) 
						} 
					/> 
					Symbols 
				</label> 
				<label> 
					<input 
						type="checkbox"
						checked={useNumbers} 
						onChange={() => 
							setUseNumbers(!useNumbers) 
						} 
					/> 
					Numbers 
				</label> 
				<label> 
					<input 
						type="checkbox"
						checked={useLowerCase} 
						onChange={() => 
							setUseLowerCase(!useLowerCase) 
						} 
					/> 
					LowerCase 
				</label> 
				<label> 
					<input 
						type="checkbox"
						checked={useUpperCase} 
						onChange={() => 
							setUseUpperCase(!useUpperCase) 
						} 
					/> 
					UpperCase 
				</label> 
			</div> 
			<button 
				style={buttonStyle} 
				onClick={generatePassword} 
			> 
				Generate Password 
			</button> 
			{password ? ( 
				<div style={inputContainerStyle}> 
					<label style={labelStyle}> 
						Generated Password: 
					</label> 
					<input 
						type="text"
						value={password} 
						readOnly 
						style={inputStyle} 
					/> 
					<button 
						style={{ 
							...buttonStyle, 
							...copyButtonStyle, 
						}} 
						onClick={copyToClipboard} 
					> 
						Copy 
					</button> 
				</div> 
			) : <></>} 
                {successMessage && ( 
                    <p 
                        style={{ 
                            color: "green", 
                            textAlign: "center", 
                        }} 
                    > 
                        {successMessage} 
                    </p> 
                )} 
		        </div>
                <div className='buttonWrap'>
                <button 
                onClick={(e) => {
                    createUser(e);
                    console.log(data);
                }}
                id="create">
                    CREATE
                </button>
                </div>
                </div>
            </div>
        </div>
    );
    
}

export default RegistrationForm;


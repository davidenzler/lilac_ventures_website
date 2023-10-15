import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import "./Login.css";
import axios from './api/axios';
import jwt from 'jwt-decode'

const LOGIN_URL = '/auth'

const Login = () => {
  const {auth, setAuth}: any = useAuth();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathme || "/";

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  useEffect(() => {
    setError('');
  }, [user, pass])

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    try{
      const response: any = await axios.post(LOGIN_URL, JSON.stringify({user, pass}),
      {
        headers: { 'Content-Type' : 'application/json'},
        withCredentials: true
      });
      const accessToken = response?.data?.accessToken;
      const decoded_data: any = jwt(accessToken)
      const userName = decoded_data['UserInfo']['username']
      const roles = decoded_data['UserInfo']['roles']
      setAuth({ user: userName, roles: roles, accessToken: accessToken });
      setUser('');
      setPass('');
      navigate("/customerPortal", {replace:true});
    } 
    catch (error:any){
      if(!error.response){
        setError("No response");
      }
      else if(error.response?.status === 400){
        setError("Username or password is missing");
      }
      else if(error.response?.status === 401){
        setError("Incorrect username or password");
      }
      else{
        setError("Login failed")
      }
      errRef.current?.focus();
    }

  }
  
  return (
        <section className='login-form'>
            <p ref={errRef} className={error ? "error" : "offscreen"} aria-live="assertive">{error}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={[pass]}
                />
                <button>Login</button>
            </form>

        </section>
  )

}
       

export default Login;

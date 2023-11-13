import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import axios from './api/axios';
import "./FirstTimeLoginForm.css";
import jwt_decode from 'jwt-decode';
import FirstTimeLoginModal from './FirstTimeLoginModal';

const LOGIN_URL = '/auth'

const Login = () => {
  const {setAuth, persist, setPersist}: any = useAuth();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [isFirstTimeLoginModalOpen, setIsFirstTimeLoginModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathme || "/";

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  useEffect(() => {
    setError('');
  }, [user, pass])

  const handleFirstTimeLogin = () => {
    setIsFirstTimeLoginModalOpen(true);
  }

  const closeFirstTimeLoginModal = () => {
    setIsFirstTimeLoginModalOpen(false);
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    try{
      const response: any = await axios.post(LOGIN_URL, JSON.stringify({user, pass}),
      {
        headers: { 'Content-Type' : 'application/json'},
        withCredentials: true
      });
      const accessToken = response?.data?.accessToken;
      const decodedToken:any = jwt_decode(accessToken);
      const userInfo:any = decodedToken['UserInfo']
      setAuth({ user: userInfo['username'], roles: userInfo['roles'], accessToken: accessToken });
      console.log("USER", userInfo.roles);
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

  const togglePersist = () => {
    setPersist((prev: any)=>!prev)
  } 

  useEffect(() => {
    localStorage.setItem("persist", persist);
  },[persist])

  return (
        <section className='login-form'>
            <p ref={errRef} className={error ? "error" : "offscreen"} aria-live="assertive">{error}</p>
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

                <label htmlFor="currentPassword">Current Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={[pass]}
                />
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={[pass]}
                />
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={[pass]}
                />
                <button>Reset Password</button>
            </form>
        </section>
  )

}
       

export default Login;
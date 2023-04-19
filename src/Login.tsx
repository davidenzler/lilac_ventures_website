import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './login-components/context/AuthProvider';
import axios from './api/axios';

const LOGIN_URL = 'http://localhost:3000/login'

const Login = () => {
  const {setAuth}: any = useContext(AuthContext);

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  useEffect(() => {
    setError('');
  }, [user, pass])

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try{
      const response: any = await axios.post(LOGIN_URL, JSON.stringify({user, pass}),
      {
        headers: { 'Content-Type' : 'application/json'},
        withCredentials: true
      });
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pass, roles, accessToken });
      setUser('');
      setPass('');
      setSuccess(true);
    } 
    catch (error:any){
      if(!error.response){
        setError("No response");
      }
      else if(error.response?.status === 400){
        setError("Username or password is missing");
      }
      else if(error.response?.status === 401){
        setError("Unauthorized access");
      }
      else{
        setError("Login failed")
      }
      errRef.current?.focus();
    }

  }
  
  return (
    <>
    {success ? (
        <section>
            <h1>Login successful</h1>
            <br />
            <p>
                <a href="#">Return to home page</a>
            </p>
        </section>
    ) : (
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
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={[pass]}
                    required
                />
                <button>Login</button>
            </form>
            <Link to="/clientPortal">Client Portal</Link><br></br>
            <Link to="/customerPortal">Customer Portal</Link>
        </section>
    )}
</>
)
}
       

export default Login;

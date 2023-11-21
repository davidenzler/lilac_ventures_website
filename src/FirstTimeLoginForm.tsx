import React, { useState, useRef, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import "./FirstTimeLoginForm.css";
import FirstTimeLoginModal from './FirstTimeLoginModal';
import { reset } from './services/reset';

const LOGIN_URL = '/auth'

const Login = ({user, close}:any) => {
  const {setAuth, persist, setPersist}: any = useAuth();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [error, setError] = useState('');
  const [passwordsMatch, setpasswordsMatch] = useState(false);

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
      const response:any = await reset(user, pass, newPass);
      close();
      navigate("/login", {replace:true});
    } 
    catch (error:any){
      if(!error.response){
        setError("No response");
      }
      errRef.current?.focus();
    }

  }

  const checkPasswords = (e:any) => {
    const passwordConfirmValue = e.target.value;
    if(passwordConfirmValue === newPass) {
      setpasswordsMatch(true);
    } else {
      setpasswordsMatch(false);
    }
    console.log(passwordsMatch);
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
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    required
                />
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    required
                    onChange={(e) => setNewPass(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                    type="password"
                    id="newPasswordCheck"
                    required
                    onChange={checkPasswords}
                    style={!passwordsMatch ? styles.passwordMismatch : styles.blank }
                />
                {!passwordsMatch ? <span>New password does not match</span> : <></>}
                <button
                  style={passwordsMatch ? styles.enabledButton : styles.disabledButton}
                >
                  Reset Password
                </button>
            </form>
        </section>
  )

}

const styles = {
    disabledButton: {
      cursor: 'not-allowed',
      color: 'black',
      background: 'grey'
    },
    enabledButton: {
      cursor:'pointer'
    },
    passwordMismatch: {
      border: 'medium solid',
      borderColor: 'red',
    },
    blank: {

    }
}

export default Login;
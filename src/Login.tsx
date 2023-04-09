import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './login-components/Form';


function Login() {
  const test = { 
    email: "test@test.com",
    password: "test123"
  }

  const[user, userToken] = useState({email: ""});

  const Login = (info: any) => {
   console.log(info);

   if (info.email == test.email && info.password == test.password){
    console.log("Success!")

    userToken({email: info.email});

   }
   else{
    console.log("Failure")
   }

  }

  return (
    <div className="login">
      {(user.email != "") ? (
        <div className="welcome">
          <h2>Welcome!</h2>
        </div>
      ) : (
        <Form Login={Login}/>
      )}

      <div className="clientportal">
       <Link to="/clientPortal">Client Portal</Link>
      </div>
    </div>

  );
}

export default Login;

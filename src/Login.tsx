import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the Login Page.</p>
      <Link to="/clientPortal">Client Portal</Link>
    </div>
  );
}

export default Login;

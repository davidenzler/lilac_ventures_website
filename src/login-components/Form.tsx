import React from 'react'
import { useState } from 'react'

function Form({Login}: {Login: any}) {
    const [info, setInfo] = useState({email: "", password: ""});

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        Login(info);
    }

  return (
    <form onSubmit={submitHandler}>
        <div className='form-inner'>
            <h2>Login</h2>
            <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={e => setInfo({...info, email: e.target.value})} value={info.email} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" onChange={e => setInfo({...info, password: e.target.value})} value={info.password} />
            </div>
            <input type="submit" value="Login"/>
        </div>
    </form>
  )
}

export default Form
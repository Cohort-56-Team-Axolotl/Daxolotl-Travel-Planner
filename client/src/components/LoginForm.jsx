import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('you have submitted the login!');
    const user = {username, password};

    const response = await axios.post('/api/users/login', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //if response is OK, reset state to empty string, change loggedIn to true to redirect user to home
    if(response.status === 200){
      setUsername('');
      setPassword('');
      setLoggedIn(true);
      console.log('you have logged in!');
    }
  };

  //to send user to home page once loggedIn is true
  if(loggedIn){
    return <Navigate to='/home' />;
  }

  return (
    <>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>

        <label>Password</label>
        <input type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
    
        <button>Login</button>
      </form>
      {/* {error && <div>{error}</div>} */}
    </>
  );
  
};

export default LoginForm;
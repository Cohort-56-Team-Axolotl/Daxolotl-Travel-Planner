import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sendBacktoLogin, setSendToLogin] = useState(false);
  // const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('this signup form has been submitted!');
    const user = { username, password, first_name, last_name };

    const response = await axios.post('/api/users/signup', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(response.status === 200){
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      setSendToLogin(true);
      console.log('you have successfully signed up!');
    }
  };

  if(sendBacktoLogin){
    return <Navigate to='/' />;
  }

  return(
    <div className='signup-page'>
      <form className='signupform' onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type='text'
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)} />

        <label>Last Name</label>
        <input type='text'
          value={last_name}
          onChange={(e) => setLastName(e.target.value)} />

        <label>Username</label>
        <input type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

        <button>Sign Up</button>
      </form>
      {/* {error && <div>{error}</div>} */}
    </div>
  );
};

export default Signup;
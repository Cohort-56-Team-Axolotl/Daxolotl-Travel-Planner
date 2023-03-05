import React, { useState } from 'react';

const LoginForm = () => {
  
  //to be finished to send to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('you have submitted the login!');
    const user = {username, password};
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

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
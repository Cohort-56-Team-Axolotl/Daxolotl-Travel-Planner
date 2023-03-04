import React from 'react';

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('you have submitted the login!');
  };

  return (
    <form className='loginForm' onSubmit={handleSubmit}>
      <label>Username</label>
      <input type='text'/>

      <label>Password</label>
      <input type='password'/>
    
      <button>Login</button>
    </form>
  );
  
};

export default LoginForm;
import React from 'react';

import WithoutNav from '../components/WithoutNav.jsx';
import LoginForm from '../components/LoginForm.jsx';

//login page as landing page
const Login = () => {

  return(
    <div className='login-page'>
      <WithoutNav />
      <div className='login-container'>
        <LoginForm />
        <h5><a href='/signup'>Don&apos;t have an account? Sign up</a></h5>
      </div>
    </div>
  );

};


export default Login;
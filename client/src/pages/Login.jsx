import React from 'react';

import WithoutNav from '../components/WithoutNav.jsx';
import LoginForm from '../components/LoginForm.jsx';

//login page as landing page
const Login = () => {

  return(
    <div>
      <WithoutNav />
      <LoginForm />
      <h5><a href='/signup'>Sign Up Here</a></h5>
    </div>
  );

};


export default Login;
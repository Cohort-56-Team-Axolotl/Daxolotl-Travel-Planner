import React from 'react';

const Signup = () => {
  return(
    <div>
      <form>
        <label>Username</label>
        <input type='text' />

        <label>Password</label>
        <input type='password' />

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
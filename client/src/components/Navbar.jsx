import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import axolotlBoba from '../images/AxolotlBoba.png';

const Navbar = () => {
  const [goToLogin, setGoToLogin] = useState(false);

  const handleClick = async () => {
    const response = await axios.delete('/api/users/logout/');

    if (response.status === 200){
      setGoToLogin(true);
    }
  };

  if (goToLogin){
    return <Navigate to = "/" />;
  }
  return (
    // <div>this is the withoutNav</div>
    <nav className='Navbar'>
      <img src={axolotlBoba} />
      <Link to='/home'>
        <button>Home</button>
      </Link>
      <button span className = 'log-out' onClick = {handleClick}><h2>Logout</h2></button>
    </nav>
  );
};

export default Navbar;
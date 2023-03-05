import React from 'react';
import { Link } from 'react-router-dom';
import axolotlBoba from '../images/AxolotlBoba.png';

const Navbar = () => {

  return (
    // <div>this is the withoutNav</div>
    <nav className='Navbar'>
      <img src={axolotlBoba} />
      <Link to='/home'>
        <button>Home</button>
      </Link>
    </nav>
  );
};

export default Navbar;
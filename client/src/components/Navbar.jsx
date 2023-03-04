import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    // <div>this is the withoutNav</div>
    <nav className='Navbar'>
      <img src='../assets/AxolotlBoba.png' />
      <Link to='/Itinerary'>
        <button>Itinerary</button>
      </Link>
    </nav>
  );
};

export default Navbar;
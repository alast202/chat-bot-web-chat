import React from 'react';
import './NavBar.css';
import logo from './assets/logoblue.png';


const NavBar = () => {
  return (
    <div className='NavBar'>
        <div className='logo'>
            <img src={logo}/>
        </div>
    </div>
  )
}

export default NavBar
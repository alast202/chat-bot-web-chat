import React from 'react'
import NavBar from './NavBar'
import './intro.css';
import logoMark from './assets/Logo Mark.png';
import { Link } from "react-router-dom";





const Page1 = () => {
  return (
    
        
    <div className='pageContainer'>
        <NavBar/>
        <div className='container'>
            <div className='wrap-content'>
                <img src={logoMark} alt="KinHub Logo"/>
                <h1>This is Charlie</h1>
                <p>Charlie is a next-generation conversational AI designed to give you guidance and support for your mental wellbeing. </p>
                <h2>This is a Demo</h2>
                <p>Some of CharlieAI’s features will be unavailable or limited in this version. The full version is a work in progress.</p>
                <Link style = {{textDecoration:'none'}}to = "/dataprivacy"><p className='button'>Continue</p></Link>
            </div>
            
        </div>
    </div>
    
  )
}

export default Page1
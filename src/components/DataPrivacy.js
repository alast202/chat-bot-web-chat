import React from 'react';
import NavBar from './NavBar'
import './intro.css';
import logoMark from './assets/Logo Mark.png';
import { Link } from "react-router-dom";

const DataPrivacy = () => {
  return (
    <div className='pageContainer'>
        <NavBar/>
        <div className='container'>
            <div className='wrap-content'>
                <img src={logoMark} alt="KinHub Logo"/>
                <h1>Data & Privacy</h1>
                <p>Your privacy is important to us. We diligently collect and process specific data soley to enhance your personalized experience. We treat your information with the utmost care and adhere to stringent data protection laws. </p>
                <p>Your personal data is securley stored and never sold or shared. You retain the right to request the deletion of your data at any time.</p>
                <p>For research purposes, we collect non-identifying information pertaining to app usage. Should you have any concerns or inquiries, please do not hesitate to contact us at <b>hello@kinhub.com</b></p>
                <Link style = {{textDecoration:'none'}}to = "/botchat"><p className='button'>Continue</p></Link>
            </div>
            
        </div>
    </div>
  )
}

export default DataPrivacy
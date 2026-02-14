import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png.png';
import '../assets/styles/landing-header.css';

const LandingHeader = () => {
  return (
    <header className="landing-header">
      <div className="container landing-header-content">
        <div className='landing-logo-container'>
          <img src={logo} alt="ReserveNow Logo" className="landing-logo-img" />
          <span className='landing-header-title'>AI Reservation & CRM System</span>
        </div>
        <div className='landing-nav-links'>
          <Link to="#features">Services</Link>
          <Link to="#benefits">How it works</Link>
          <Link to="#status">Booking Status</Link>
          <Link to="#contact">Contact</Link>
        </div>
        <div className='landing-buttons'>
          <Link to="/adminlogin">
            <button className="landing-btn-admin">Admin login</button>
          </Link>
          <Link to="/customerservice">
            <button className="landing-btn-primary">Book a Service</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;

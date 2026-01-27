import React from 'react';
import { CheckCircle, Moon, Globe } from 'lucide-react';
import logo from '../assets/logo.png.png';
import '../assets/styles/header.css';
import Vector1 from '../assets/Vector1.png';

const Header = ({
  icon = 'check',
  showThemeToggle = false,
  showMyBookings = true,
  myBookingsText = 'My Bookings'
}) => {
  const IconComponent = icon === 'check' ? CheckCircle : icon === 'globe' ? Globe : CheckCircle;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <img src={logo} alt="Logo" />
          </div>
          <span className="logo-text">AI Reservation & CRM System</span>
        </div>
        <div className="header-actions">
          {showThemeToggle && (
            <button className="theme-toggle">
              <img src={Vector1} alt="Theme Icon" />
            </button>
          )}
          {showMyBookings && (
            <button className="my-bookings-btn">{myBookingsText}</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
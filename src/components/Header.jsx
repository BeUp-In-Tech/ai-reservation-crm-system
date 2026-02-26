import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Moon, Globe } from 'lucide-react';
import logo from '../assets/logo.png.png';
import '../assets/styles/header.css';
import Vector1 from '../assets/Vector1.png';
import { usePlatform } from '../pages/platformContext';
const Header = ({
  icon = 'check',
  // showThemeToggle = false,
  // showMyBookings = true,
  // myBookingsText = 'My Bookings'
}) => {

  const navigate = useNavigate();  // 👈 Add this
  const { platformName } = usePlatform();  // 👈 Add platform context

  const IconComponent =
    icon === 'check' ? CheckCircle :
    icon === 'globe' ? Globe :
    CheckCircle;

  return (
    <header className="header">
      <div className="header-content">
        
        {/* 👇 Make this clickable */}
        <div
          className="logo-section"
          onClick={() => navigate('/')}   // 👈 Goes to LandingPage route
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-icon">
            <img src={logo} alt="Logo" />
          </div>
          <span className="logo-text">
            {platformName}
          </span>
        </div>

        <div className="header-actions">
          {/* Buttons here */}
        </div>

      </div>
    </header>
  );
};

export default Header;

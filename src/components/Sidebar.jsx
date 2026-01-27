import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Settings,
  TrendingUp,
  LogOut,
  Sliders
} from 'lucide-react';
import '../assets/styles/sidebar.css';
import logo from '../assets/logo.png.png';

// Map menu names to their routes
const menuRoutes = {
  'Dashboard': '/adminDashboard',
  'Bookings': '/adminBooking',
  'AI Configuration': '/aiconfigaration',
  'Analytics': '/analytics', // Update this when Analytics page is created
  'Settings': '/settings'   // Update this when Settings page is created
};

// Map routes to menu names (for detecting active menu from URL)
const routeToMenu = {
  '/adminDashboard': 'Dashboard',
  '/adminBooking': 'Bookings',
  '/aiconfigaration': 'AI Configuration',
  '/analytics': 'Analytics',
  '/settings': 'Settings'
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active menu based on current route
  const activeMenu = routeToMenu[location.pathname] || 'Dashboard';

  const handleMenuClick = (menuName) => {
    const route = menuRoutes[menuName];
    if (route) {
      navigate(route);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="sidebar-nav">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-title">AI Reservation & CRM System</div>
            <div className="sidebar-logo-subtitle">ADMIN CONSOLE</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-menu">
        <button
          className={`menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Dashboard')}
        >
          <LayoutDashboard className="menu-icon" />
          <span>Dashboard</span>
        </button>
        <button
          className={`menu-item ${activeMenu === 'Bookings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Bookings')}
        >
          <Calendar className="menu-icon" />
          <span>Bookings</span>
        </button>
        <button
          className={`menu-item ${activeMenu === 'AI Configuration' ? 'active' : ''}`}
          onClick={() => handleMenuClick('AI Configuration')}
        >
          <Sliders className="menu-icon" />
          <span>AI Configuration</span>
        </button>
        <button
          className={`menu-item ${activeMenu === 'Analytics' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Analytics')}
        >
          <TrendingUp className="menu-icon" />
          <span>Analytics</span>
        </button>
        <button
          className={`menu-item ${activeMenu === 'Settings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Settings')}
        >
          <Settings className="menu-icon" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut className="logout-icon" />
          <span>Log Out</span>
        </button>

        <div className="user-profile">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="User"
            className="user-avatar"
          />
          <div className="user-info">
            <div className="user-name">Brock Dixon</div>
            <div className="user-role">Admin</div>
          </div>
          <div className="notification-badge">🔔</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Search, Clock, DollarSign, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import '../assets/styles/customer.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Robot from '../assets/Rectangle 6.png';

export default function AIReservationCRM() {
  const [activeTab, setActiveTab] = useState('All Services'); // Track active tab
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All Services', 'Consultation', 'Treatments', 'Emergency', 'Virtual Care'];

  const services = [
    {
      id: 1,
      icon: '🦷',
      title: 'Comprehensive Dental Checkup',
      description: 'Full oral examination including deep cleaning, X-rays and personalized treatment plan.',
      duration: '45 Minutes',
      price: '$85.53',
      location: 'Main Clinic, 3rd floor',
      badge: 'MOST POPULAR',
      category: 'Consultation'
    },
    {
      id: 2,
      icon: '🏆',
      title: 'Personal Training Session',
      description: 'One-on-one fitness training to help you achieve your health and wellness goals.',
      duration: '60 Minutes',
      price: '$94.55',
      location: 'East Wing Studio',
      category: 'Treatments'
    },
    {
      id: 3,
      icon: '🍽️',
      title: "Chef's Table Reservation",
      description: 'Exclusive dining experience with a curated menu crafted by our executive chef.',
      duration: '120 Minutes',
      price: 'Free Reservation',
      location: 'Main Dining Hall',
      category: 'Emergency'  // This could be adjusted as per the category
    },
    {
      id: 4,
      icon: '💻',
      title: 'Virtual Health Consult',
      description: 'Connect with healthcare experts right from your home via video consultation.',
      duration: '30 Minutes',
      price: '$42.99',
      location: 'Remote / Video',
      category: 'Virtual Care'
    },
    {
      id: 5,
      icon: '💆',
      title: 'Deep Tissue Massage',
      description: 'Therapeutic massage targeting muscle tension and stress relief for ultimate relaxation.',
      duration: '90 Minutes',
      price: '$110.00',
      location: 'Wellness Suite 1',
      category: 'Consultation'  // Adjust category as needed
    }
  ];

  // Filter services based on the active tab
  const filteredServices = services.filter(service =>
    activeTab === 'All Services' || service.category === activeTab
  );

  const handleViewAllBookingsClick = () => {
    servicesGridRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="ai-reservation-container">
      <Header showThemeToggle={false} myBookingsText="My Booking" />
      <div className="main-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-grid">
            <div className="hero-illustration">
              <div className="illustration-content">
                <div className="ai-circle-inner">
                  <img src={Robot} alt="AI Robot" />
                </div>
              </div>
            </div>

            <div className="hero-text">
              <div className="instant-badge">
                INSTANT CONFIRMATIONS
              </div>
              <h1 className="hero-title">
                Seamless care,{' '}
                <span className="hero-highlight">one click away.</span>
              </h1>
              <p className="hero-description">
                Fast, automated booking powered by our AI receptionist. Select a service below to get started.
              </p>
              <button
                className="view-bookings-btn"
                onClick={handleViewAllBookingsClick} // Add click handler here
              >
                View All Bookings
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for dental cleanups, massage, coaching..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? 'tab-active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-content">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  {service.badge && (
                    <span className="service-badge">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-details">
                  <div className="service-detail-item">
                    <Clock className="detail-icon" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="service-detail-item">
                    <DollarSign className="detail-icon" />
                    <span className="price-text">{service.price}</span>
                  </div>
                  <div className="service-detail-item">
                    <MapPin className="detail-icon" />
                    <span>{service.location}</span>
                  </div>
                </div>

                <Link to="/customerservice1" className="service-link">
                  <button className="book-now-btn">
                    Book Now
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Card */}
        <div className="empty-state-card">
          <div className="empty-state-icon-wrapper">
            <MessageCircle className="empty-state-icon" />
          </div>
          <h3 className="empty-state-title">Don't see what you need?</h3>
          <p className="empty-state-description">
            Our AI assistant can help you find special requests or availability across different sites.
          </p>
          <button className="talk-ai-btn">
            💬 Talk to our AI
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="reservation-footer">
        <div className="footer-wrapper">
          <div className="footer-content">
            <p className="footer-text">
              AI Reservation & CRM System • 2025 AI Receptionist & CRM System
            </p>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
            </div>
            <p className="footer-protected">
              Protected by ⚡ AI Reservation & CRM System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

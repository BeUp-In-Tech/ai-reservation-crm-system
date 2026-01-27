import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png.png';
import spoon1 from '../assets/spoon1.png';
import home from '../assets/home.png';
import heart from '../assets/heart.png';
import typhoon from '../assets/typhoon.png';
import cup from '../assets/cup.png';
import spoon from '../assets/spoon.png';
import gym from '../assets/gym.png';
import heartblue from '../assets/heartblue.png';
import '../assets/styles/style.css';
import rocket from '../assets/rocket.png';
import grow from '../assets/grow.png';
import typhoon1 from '../assets/typhoon1.png';
import tel from '../assets/tel.png';
import fb from '../assets/fb.png';
import lin from '../assets/lin.png';
import insta from '../assets/insta.png';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import Container from '../assets/Container.png';

export default function ReservationCRM() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: ''
  });

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert('Reservation request submitted!');
  };

  return (
    <div className="app">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          {/* Hero Section */}
          <div className="hero-content">
            <div className="hero-badge">
              <p>WE'RE LIVE ACROSS 50+ CITIES IN USA/CANADA</p>
            </div>
            <h1 className="hero-title">
              Your 24/7 AI Reservation & CRM System.
            </h1>
            <h1 className='typing-effect' style={{ color: "#345ce2" }}>Never miss a booking.</h1>
            <p className="hero-subtitle">
              Never miss a booking again. Automate reservations, manage customers, and grow your business effortlessly.
            </p>
            <div className="hero-buttons">
              <Link to="/customerservice"><button className="btn-primary1 btn-large">Get Started ⟶</button></Link>
              <button className="btn-secondary1 btn-large">Watch Demo</button>
            </div>
            <p className="trusted">Trusted by 500+ businesses</p>
          </div>

          {/* Chat Interface */}
          <div className="chat-container">
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="avatar"></div>
                <img src={Container} alt="container" className="container-icon" />
                <h2>AI Receptionist</h2>
              </div>
              <div className="chat-status">
                <span className="online">⚫
                  Online 24/7</span>
              </div>
            </div>

            <div className="chat-content">
              <div className="message customer">
                <p>Good morning! I'd like to make a reservation for dinner tonight.</p>
                <div className="message-info">
                  <span className="user">Customer</span>
                  <span className="time">9:23 AM</span>
                </div>
              </div>
              <div className="message ai">
                <p>Perfect! I can help you with that. How many guests will be joining you tonight?</p>
                <div className="message-info-ai">
                  <span className="user">AI Assistant</span>
                  <span className="time">9:23 AM</span>
                </div>

              </div>
              <div className="message customer">
                <p>Four people, around 7:30 PM if possible.</p>
                <div className="message-info">
                  <span className="user">Customer</span>
                  <span className="time">9:24 AM</span>
                </div>

              </div>
              <div className="message ai">
                <p>Excellent! I've reserved a table for 4 at 7:30 PM tonight. You'll receive a confirmation text shortly.</p>
                <div className="message-info-ai">
                  <span className="user">AI Assistant</span>
                  <span className="time">9:24 AM</span>
                </div>
              </div>
            </div>

            <div className="typing-indicator">
              <span>AI is typing...</span>
            </div>
          </div>

        </div>
      </section>


      <section className="trusted-section">
        <div className="container">
          <p className="trusted-heading">Trusted by Businesses Across Industries</p>
          <div className="trusted-icons">
            <div className="icon-item">
              <img src={spoon1} alt="IT Bistro" className="icon" />
              <p>IT BISTRO</p>
            </div>
            <div className="icon-item">
              <img src={home} alt="Homepage" className="icon" />
              <p>HOMEPAGE</p>
            </div>
            <div className="icon-item">
              <img src={heart} alt="Healthcare" className="icon" />
              <p>HEALTHCARE</p>
            </div>
            <div className="icon-item">
              <img src={typhoon} alt="Zentry" className="icon" />
              <p>ZENTRY</p>
            </div>
            <div className="icon-item">
              <img src={cup} alt="Brewery" className="icon" />
              <p>BREWERY</p>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title1 text-center text-2xl font-semibold">Industries We Serve</h2>
          <p className="text-xl text-gray-600 font-normal leading-7 mt-4 mb-8 text-center max-w-2xl mx-auto">
            From restaurants to wellness centers, we tailor our AI-native service around your business use case. Integration directly into your workflows.
          </p>

          <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="icon-wrapper">
                <img src={spoon} alt="spoon" className="icon-image" />
              </div>
              <h3 className="feature-title">Restaurants</h3>
              <p className="feature-text">
                We make reservations simple and increase booking conversion by seamlessly confirming tables.
              </p>
              <ul className="feature-list">
                <li>Table bookings</li>
                <li>Special requests</li>
                <li>Party reservations</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="icon-wrapper">
                <img src={gym} alt="gym" className="icon-image" />
              </div>
              <h3 className="feature-title">Gyms & Wellness</h3>
              <p className="feature-text">
                Never lose a client to a missed call. Our AI books and schedules classes 24/7.
              </p>
              <ul className="feature-list">
                <li>Class booking</li>
                <li>Personal training</li>
                <li>Wellness check</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="icon-wrapper">
                <img src={heartblue} alt="heartblue" className="icon-image" />
              </div>
              <h3 className="feature-title">Medical Clinics</h3>
              <p className="feature-text">
                Make scheduling patient appointments quicker, easier, and more efficient with AI-driven calling.
              </p>
              <ul className="feature-list">
                <li>Patient scheduling</li>
                <li>Appointment reminders</li>
                <li>Medical referrals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h1 className="section-title">Zero effort, maximum growth</h1>
          <p className="section-subtitle">Going live takes less than 10 minutes. No coding. Just install. We do the rest.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="icon-wrapper-dark">
                <img src={rocket} alt="rocket" className="icon-white" />
              </div>
              <h3 className="benefit-title">DEPLOY</h3>
              <p className="benefit-text">
                Get started in minutes. No coding required. Our AI integrates seamlessly with your existing systems.
              </p>
            </div>
            <div className="benefit-card">
              <div className="icon-wrapper-dark">
                <img src={typhoon1} alt="typhoon" className="icon-white" />
              </div>
              <h3 className="benefit-title">AUTOMATE</h3>
              <p className="benefit-text">
                AI handles booking 24/7 without manual follow-ups--instant confirmations every time.
              </p>
            </div>
            <div className="benefit-card">
              <div className="icon-wrapper-dark">
                <img src={grow} alt="grow" className="icon-white" />
              </div>
              <h3 className="benefit-title">SCALE</h3>
              <p className="benefit-text">
                Effortlessly scale alongside your business without adding more stuff or operational overhead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Status */}
      <section className="booking-status">
        <div className="container">
          <h2 className="section-titles">Check Your Booking Status</h2>
          <p className="section-subtitles">Enter your email to check your booking status.</p>
          <div className="status-card">
            <div className="form-fields">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
              />
              {/* <input
                  type="text"
                  placeholder="Booking reference number"
                  className="input-field"
                /> */}
              <button className="btn-submit">Check Status</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2 className="section-titles">Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item card">
                <div className="contact-icon">
                  <Phone className="icon" />
                </div>
                <div>
                  <h3 className="contact-label">Phone</h3>
                  <p className="contact-value">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item card">
                <div className="contact-icon">
                  <Mail className="icon" />
                </div>
                <div>
                  <h3 className="contact-label">Email</h3>
                  <p className="contact-value">support@reservenow.com</p>
                </div>
              </div>
              <div className="contact-item card">
                <div className="contact-icon">
                  <MapPin className="icon" />
                </div>
                <div>
                  <h3 className="contact-label">Address</h3>
                  <p className="contact-value">
                    123 Business Ave, Suite 100<br />New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
            <div className="form-card">
              <div className="form-fields">
                <input type="text" placeholder="Your Name" className="input-field" />
                <input type="email" placeholder="Your Email" className="input-field" />
                <input type="text" placeholder="Subject" className="input-field" />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="textarea-field"
                ></textarea>
                <button className="btn-submit">Send Message</button>
              </div>
            </div>

          </div>
        </div>
      </section>


      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Left Section: Logo and Description */}
            <div className="footer-logo">
              <div className="logo">
                {/* Insert your logo here */}
                <img src={logo} alt="Logo" /><span>AI Reservation & CRM System</span>
              </div>
              <p>Your 24/7 AI-powered receptionist that never misses a booking.</p>
              <div className="social-icons">
                <div>
                  <img src={tel} alt="telegram" className="social-icon" />
                </div>
                <div>
                  <img src={fb} alt="facebook" className="social-icon" />
                </div>
                <div>
                  <img src={lin} alt="linkedin" className="social-icon" />
                </div>
                <div>
                  <img src={insta} alt="instagram" className="social-icon" />
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><a href="#">AI Receptionist</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Services</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Booking Status</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="newsletter">
              <h4>Newsletter</h4>
              <p>Get the latest updates and news</p>
              <form>
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button type="submit" className="btn-submit">Subscribe</button>
              </form>
            </div>
          </div>

          {/* Legal Links */}
          <div className="footer-bottom">
            <p>&copy; 2026 AI Reservation & CRM System Inc. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
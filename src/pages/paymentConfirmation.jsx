import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, DollarSign, ArrowLeft, Home } from 'lucide-react';
import '../assets/styles/payment.css';
import '../assets/styles/paymentConfirmation.css';
import Header from '../components/Header.jsx';
import hygn from '../assets/hygn.png';

export default function PaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceName, price, businessName, selectedTime, selectedDate, bookingId } = location.state || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewBookings = () => {
    navigate('/customerservice');
  };

  return (
    <div className="payment-page">
      <Header icon="globe" showThemeToggle={true} />
      
      <main className="payment-main">
        <div className="payment-container">
          <div className="payment-confirmation-container">
            
            {/* Success Header */}
            <div className="confirmation-header">
              <div className="success-icon-wrapper">
                <CheckCircle className="success-icon" size={64} color="#10b981" />
              </div>
              <h1 className="confirmation-title">Payment Successful!</h1>
              <p className="confirmation-subtitle">
                Your booking has been confirmed and payment processed successfully.
              </p>
            </div>

            {/* Booking Confirmation Card */}
            <div className="confirmation-card">
              <div className="confirmation-header-row">
                <div className="service-info">
                  <div className="service-icon-wrapper">
                    <div className="service-icon"><img src={hygn} alt="service" /></div>
                  </div>
                  <div className="service-details">
                    <h2 className="service-name">{serviceName || 'Service Reservation'}</h2>
                    <p className="business-name">{businessName || 'Direct Booking'}</p>
                    {bookingId && (
                      <p className="booking-id">Booking ID: #{bookingId}</p>
                    )}
                  </div>
                </div>
                <div className="status-badge success">
                  <CheckCircle size={16} />
                  Confirmed
                </div>
              </div>

              <div className="booking-details-grid">
                <div className="detail-row">
                  <div className="detail-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Date</label>
                    <p className="detail-value">{selectedDate || "Not specified"}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-icon">
                    <Clock size={20} />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Time</label>
                    <p className="detail-value">{selectedTime || "Not specified"}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-icon">
                    <DollarSign size={20} />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Amount Paid</label>
                    <p className="detail-value amount">${price || '0.00'}</p>
                  </div>
                </div>
              </div>

              <div className="payment-info-box">
                <h3 className="payment-info-title">Payment Information</h3>
                <div className="payment-details">
                  <div className="payment-row">
                    <span className="payment-label">Payment Method</span>
                    <span className="payment-value">Credit Card</span>
                  </div>
                  <div className="payment-row">
                    <span className="payment-label">Transaction ID</span>
                    <span className="payment-value">TXN{Date.now()}</span>
                  </div>
                  <div className="payment-row">
                    <span className="payment-label">Payment Date</span>
                    <span className="payment-value">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="info-section">
              <h3 className="info-title">Important Information</h3>
              <ul className="info-list">
                <li>You will receive a confirmation email shortly with all the booking details.</li>
                <li>Please arrive 10 minutes before your scheduled appointment time.</li>
                <li>If you need to reschedule, please contact us at least 24 hours in advance.</li>
                <li>Keep your booking ID for future reference.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="btn-secondary"
                onClick={handleBackToHome}
              >
                <Home size={18} />
                Back to Home
              </button>
              
              <button 
                className="btn-primary"
                onClick={handleViewBookings}
              >
                <Calendar size={18} />
                View My Bookings
              </button>
            </div>

            {/* Help Section */}
            <div className="help-section">
              <h3 className="help-title">Need Help?</h3>
              <p className="help-text">
                If you have any questions about your booking or need to make changes, 
                please don't hesitate to contact our support team.
              </p>
              <div className="contact-info">
                <p>Email: support@reservation.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { Moon, Phone, Users, Clock, MapPin, CheckCircle, Smile, Paperclip, Send } from 'lucide-react';
import '../assets/styles/customer1.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import market from '../assets/market.png';
import sending from '../assets/sending.png';

function ActionButtons() {
  return (
    <div className="action-buttons">
      <Link to="/paymentsystem">
        <button className="confirm-btn">
          <CheckCircle className="btn-icon" />
          Confirm Booking
        </button>
      </Link>
      <button className="change-time-btn">Change Time</button>
    </div>
  );
}

export default function BookingAssistant() {
  const [selectedTime, setSelectedTime] = useState('7:00 PM');
  const [message, setMessage] = useState('');
  const progress = 65;

  const timeSlots = [
    { time: '5:30 PM', available: true },
    { time: '6:00 PM', available: true },
    { time: '6:30 PM', available: true },
    { time: '7:00 PM', available: true },
    { time: '7:30 PM', available: true },
    { time: '8:00 PM', available: false }
  ];

  //   const handleConfirmBooking = () => {
  //     alert(`Booking confirmed for ${selectedTime} on Saturday!`);
  //   };

  return (
    <div className="booking-container">
      <Header icon="check" showThemeToggle={true} />
      {/* Main Content */}
      <main className="maincontent">
        <div className="contentgrid">
          {/* Left Sidebar - Booking Details */}
          <aside className="sidebar">
            {/* Booking Card */}
            <div className="booking-card">
              <div className="card-header">
                <div className="cart-icon">
                  <img src={market} alt="market" />
                </div>
                <div>
                  <h2 className="card-title">Table for 4 People</h2>
                  <p className="card-subtitle">Dinner Reservation</p>
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <div className="detail-label">
                    <Users className="detail-icon" />
                    <span>Party Size</span>
                  </div>
                  <span className="detail-value">4 Guests</span>
                </div>

                <div className="detail-row">
                  <div className="detail-label">
                    <Clock className="detail-icon" />
                    <span>Dining Time</span>
                  </div>
                  <span className="detail-value">~2 Hours</span>
                </div>

                <div className="detail-row">
                  <div className="detail-label">
                    <MapPin className="detail-icon" />
                    <span>Location</span>
                  </div>
                  <span className="detail-value">Main Dining Area</span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">BOOKING PROGRESS</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="progress-text">Almost there! Select your preferred time.</p>
              </div>
            </div>

            {/* Confirmation Card */}
            <div className="confirmation-card">
              <div className="confirmation-icon">
                <CheckCircle className="check-icon" />
              </div>
              <div>
                <h3 className="confirmation-title">Instant Confirmation</h3>
                <p className="confirmation-text">
                  Your booking will be confirmed immediately after you pick a time. No phone calls required.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Main - Chat Interface */}
          <section className="chat-section">
            <div className="chat-container">
              {/* Chat Header */}
              <div className="chat-header">
                <div className="assistant-info">
                  <div className="assistant-avatar">
                    <div className="avatar-circle"></div>
                  </div>
                  <div>
                    <h3 className="assistant-name">AI Booking Assistant</h3>
                    <p className="assistant-status">
                      <span className="status-indicator"></span>
                      Live & Ready to help
                    </p>
                  </div>
                </div>
                <button className="start-call-btn">
                  <Phone className="phone-icon" />
                  Start Call
                </button>
              </div>

              {/* Chat Messages */}
              <div className="chat-messages">
                <div className="message-group">
                  <div className="message assistant-message">
                    <div className="message-avatar">
                      <div className="avatar-small"></div>
                    </div>
                    <div className="message-bubble">
                      Hello! I can help you book a table at our restaurant. I've found some available times for this week. What day and time works best for you?
                    </div>
                  </div>
                </div>

                <div className="message-group user-group">
                  <div className="message user-message">
                    <div className="message-bubble user-bubble">
                      I'd like to make a reservation for Saturday evening, around 7 PM if possible.
                    </div>
                  </div>
                </div>

                <div className="message-group">
                  <div className="message assistant-message">
                    <div className="message-avatar">
                      <div className="avatar-small"></div>
                    </div>
                    <div className="message-bubble">
                      Perfect! Here are the available time slots for Saturday, October 28th:
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="time-slots-container">
                    <div className="time-slots">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                          disabled={!slot.available}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confirmation Message */}
                  <div className="confirmation-message">
                    <p>
                      Excellent choice. You've selected <strong>{selectedTime} on Saturday</strong>. Would you like to confirm this booking?
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <Link to="/paymentsystem">
                      <button className="confirm-btn">
                        <CheckCircle className="btn-icon" />
                        Confirm Booking
                      </button>
                    </Link>
                    <button className="change-time-btn">Change Time</button>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="chat-input-container">
                <div className="chat-input-wrapper">
                  <button className="input-action-btn">
                    <Smile className="input-icon" />
                  </button>
                  <button className="input-action-btn">
                    <Paperclip className="input-icon" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                  />
                  <button className="sending-btn">
                    <img src={sending} alt="Send" />
                  </button>
                </div>
                <p className="powered-by">POWERED BY ADVANCED AI LOGIC</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { ActionButtons };
import React, { useState } from 'react';

import { Moon, FileText, CreditCard, CheckCircle, Lock, Globe } from 'lucide-react';

import { useNavigate, useLocation } from 'react-router-dom';

import '../assets/styles/payment.css';

import Header from '../components/Header.jsx';

import hygn from '../assets/hygn.png';

import vector from '../assets/Vector.png';

import google from '../assets/logos_google-pay.png';



export default function BookingPayment() {

  const navigate = useNavigate();

  const location = useLocation();

  const { serviceName, price, businessName, selectedTime, selectedDate } = location.state || {};



  const [paymentData, setPaymentData] = useState({

    cardholderName: 'name as on card',

    cardNumber: '0000 0000 0000 0000',

    expiryDate: 'MM/YY',

    cvv: '123'

  });



  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setPaymentData({

      ...paymentData,

      [name]: value

    });

  };



  const handlePayment = () => {

    const confirmed = window.confirm('Processing payment... Click OK to continue to home page.');

    if (confirmed) {

      navigate('/');

    }

  };



  return (

    <div className="payment-page">

      <Header icon="globe" showThemeToggle={true} />

      {/* Main Content */}

      <main className="payment-main">

        <div className="payment-container">

          <div className="payment-grid">

            {/* Left Column - Booking Summary */}

            <div className="payment-left-column">

              {/* Booking Summary Card */}

              <div className="summary-card">

                <div className="summary-header">

                  <FileText className="summary-icon" />

                  <h2 className="summary-title">Booking Summary</h2>

                </div>



                <div className="reservation-info">

                  <div className="reservation-icon-wrapper">

                    <div className="reservation-icon"><img src={hygn} alt="hygn" /></div>

                  </div>

                  <div className="reservation-details">

                    <h3 className="reservation-title">{serviceName || 'Service Reservation'}</h3>

                    <p className="reservation-subtitle">{businessName || 'Direct Booking'}</p>

                  </div>

                </div>



                <div className="booking-info-grid">

                  <div className="booking-info-row">

                    <label className="booking-label">Date</label>

                    <label className="booking-label">Time</label>

                  </div>

                  <div className="booking-info-row">

                    <input

                      type="text"

                      value={selectedDate || "Sat, Oct 28th"}

                      className="booking-input"

                      readOnly

                    />

                    <input

                      type="text"

                      value={selectedTime || "2:30 PM"}

                      className="booking-input"

                      readOnly

                    />

                  </div>

                </div>



                <div className="fee-breakdown">

                  <div className="fee-item">

                    <span className="fee-label">Service Fee</span>

                    <span className="fee-amount">${price || '0.00'}</span>

                  </div>

                  <div className="fee-item">

                    <span className="fee-label">Processing Fee</span>

                    <span className="fee-amount">$0.00</span>

                  </div>

                </div>



                <div className="total-section">

                  <span className="total-label">Total Amount</span>

                  <span className="total-amount">${price || '0.00'}</span>

                </div>

              </div>



              {/* Instant Confirmation Card */}

              <div className="confirmation-info-card">

                <div className="confirmation-info-icon">

                  <CheckCircle className="confirmation-check" />

                </div>

                <div className="confirmation-info-content">

                  <h3 className="confirmation-info-title">Instant Confirmation</h3>

                  <p className="confirmation-info-text">

                    Your booking will be confirmed immediately after you pick a time. No phone calls required.

                  </p>

                </div>

              </div>

            </div>



            {/* Right Column - Payment */}

            <div className="payment-right-column">

              <div className="payment-card">

                <div className="payment-card-header">

                  <CreditCard className="payment-card-icon" />

                  <h2 className="payment-card-title">Secure Payment</h2>

                </div>



                {/* Express Checkout */}

                <div className="express-checkout-section">

                  <h3 className="express-checkout-title">Express Checkout</h3>

                  <div className="express-buttons">

                    <button className="apple-pay-btn">

                      <img src={vector} alt="Apple Pay" />

                    </button>

                    <button className="google-pay-btn">

                      <img src={google} alt="Google Pay" />

                    </button>

                  </div>

                </div>



                <div className="divider">

                  <span className="divider-text">OR PAY WITH CARD</span>

                </div>



                {/* Card Payment Form */}

                <div className="payment-form">

                  <div className="form-group">

                    <label className="form-label">Cardholder Name</label>

                    <input

                      type="text"

                      name="cardholderName"

                      value={paymentData.cardholderName}

                      onChange={handleInputChange}

                      className="form-input"

                      placeholder="name as on card"

                    />

                  </div>



                  <div className="form-group">

                    <label className="form-label">Card Number</label>

                    <div className="card-input-wrapper">

                      <CreditCard className="card-icon-input" />

                      <input

                        type="text"

                        name="cardNumber"

                        value={paymentData.cardNumber}

                        onChange={handleInputChange}

                        className="form-input card-number-input"

                        placeholder="0000 0000 0000 0000"

                      />

                    </div>

                  </div>



                  <div className="form-row">

                    <div className="form-group">

                      <label className="form-label">Expiry Date</label>

                      <input

                        type="text"

                        name="expiryDate"

                        value={paymentData.expiryDate}

                        onChange={handleInputChange}

                        className="form-input"

                        placeholder="MM/YY"

                      />

                    </div>

                    <div className="form-group">

                      <label className="form-label">CVV</label>

                      <input

                        type="text"

                        name="cvv"

                        value={paymentData.cvv}

                        onChange={handleInputChange}

                        className="form-input"

                        placeholder="123"

                      />

                    </div>

                  </div>



                  <div className="security-notice">

                    <Lock className="security-icon" />

                    <p className="security-text">

                      Your payment information is encrypted and processed on highly secure servers.

                    </p>

                  </div>



                  <button onClick={handlePayment} className="confirm-payment-btn">

                    <Lock className="btn-lock-icon" />

                    Pay & Confirm Booking

                  </button>



                  <p className="terms-text">

                    By confirming, you agree to our{' '}

                    <a href="#" className="terms-link">Terms of service</a>

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}
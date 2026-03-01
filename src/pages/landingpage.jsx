import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
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
import { Link, useLocation, useParams } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import Container from '../assets/Container.png';
import { usePlatform as usePlatformContact } from './platformContact';

// ── Axios instance ─────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || '',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// ── Error formatter ────────────────────────────────────────────────────────
const formatBackendError = (err) => {
  const status = err?.response?.status;
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((d) => {
        const path = Array.isArray(d?.loc) ? d.loc.join('.') : '';
        const msg = d?.msg || JSON.stringify(d);
        return path ? `${path}: ${msg}` : msg;
      })
      .join('\n');
  }

  if (!err.response) return 'Network error — cannot reach the server.';
  if (status === 404) return 'Contact endpoint not found (404). Check backend route.';
  if (status === 422) return 'Validation error — please check your inputs.';
  if (status >= 500) return 'Server error. Please try again later.';

  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    'Request failed. Please try again.'
  );
};

// ── Booking normalizer ─────────────────────────────────────────────────────
const normalizeBookings = (data) => {
  // Handle { bookings: [] } or [] or { data: [] } or { results: [] }
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.bookings)) return data.bookings;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

const EMPTY_FORM = {
  name: '', email: '', phone: '', subject: '', message: '',
};

// ── Component ──────────────────────────────────────────────────────────────
export default function ReservationCRM() {
  const { business_slug } = useParams();
  const slug = business_slug || 'defence';

  // Contact form
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState('');
  const [contactError, setContactError] = useState('');

  // Platform contact info from context
  const { platformContact } = usePlatformContact();

  // Booking status checker
  const [statusEmail, setStatusEmail] = useState('');
  const [statusPhone, setStatusPhone] = useState('');
  const [bookings, setBookings] = useState(null);   // null = not checked yet
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState('');

  // ── Contact form handlers ─────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear messages when user edits
    setContactError('');
    setContactSuccess('');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setContactSuccess('');
    setContactError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setContactError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setContactLoading(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      subject: formData.subject.trim() || undefined,
      message: formData.message.trim(),
    };

    // Try both common endpoint variants
    const endpoints = [
      '/api/v1/public/contact',
      '/api/v1/contact',
      '/api/v1/public/contact/',
      '/api/v1/contact/',
      '/api/v1/public/contact-us',
      '/api/v1/public/contact-us/',
    ];

    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const res = await api.post(endpoint, payload);
        if (res.status === 200 || res.status === 201) {
          setContactSuccess('Your message has been sent successfully! We\'ll get back to you soon.');
          setFormData(EMPTY_FORM);
          setContactLoading(false);
          return;
        }
      } catch (err) {
        // If 404 (Not Found) or 405 (Method Not Allowed), try the next one
        if (err?.response?.status === 404 || err?.response?.status === 405) {
          lastError = err;
          continue;
        }
        // Non-skip error — report immediately
        setContactError(formatBackendError(err));
        setContactLoading(false);
        return;
      }
    }

    // All endpoints 404'd
    setContactError(formatBackendError(lastError));
    setContactLoading(false);
  };

  // ── Booking status handler ────────────────────────────────────────────
  const handleStatusCheck = async (e) => {
    e.preventDefault();
    setStatusError('');
    setBookings(null);

    if (!statusEmail.trim() && !statusPhone.trim()) {
      setStatusError('Please enter at least an email or phone number.');
      return;
    }

    setStatusLoading(true);

    try {
      const params = {
        ...(statusEmail.trim() && { email: statusEmail.trim() }),
        ...(statusPhone.trim() && { phone: statusPhone.trim() }),
      };

      const res = await api.get('/api/v1/public/bookings/my/list', { params });
      const list = normalizeBookings(res.data);
      setBookings(list);
    } catch (err) {
      setStatusError(formatBackendError(err));
    } finally {
      setStatusLoading(false);
    }
  };

  // ── Scroll helpers ────────────────────────────────────────────────────
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === 'contact') {
      document.querySelector('.contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const scrollTo = (selector) => (e) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <LandingHeader />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="container-hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <p>WE'RE LIVE ACROSS 50+ CITIES IN USA/CANADA</p>
            </div>
            <h1 className="hero-title">Your 24/7 AI Reservation &amp; CRM System.</h1>
            <h1 className="typing-effect" style={{ color: '#345ce2' }}>Never miss a booking.</h1>
            <p className="hero-subtitle">
              Never miss a booking again. Automate reservations, manage customers, and grow your business effortlessly.
            </p>
            <div className="hero-buttons">
              <Link to={`/customerservices/`}>
                <button className="btn-primary1 btn-large">Get Started ⟶</button>
              </Link>
              <button className="btn-secondary1 btn-large">Watch Demo</button>
            </div>
            <p className="trusted">Trusted by 500+ businesses</p>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <div className="chat-header-left">
                <img src={Container} alt="container" className="container-icon" />
                <h2>AI Receptionist</h2>
              </div>
              <div className="chat-status">
                <span className="online">⚫ Online 24/7</span>
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

      {/* ── Trusted ── */}
      <section className="trusted-section">
        <div className="container">
          <p className="trusted-heading">Trusted by Businesses Across Industries</p>
          <div className="trusted-icons">
            {[
              { src: spoon1, alt: 'IT Bistro', label: 'IT BISTRO' },
              { src: home, alt: 'Homepage', label: 'HOMEPAGE' },
              { src: heart, alt: 'Healthcare', label: 'HEALTHCARE' },
              { src: typhoon, alt: 'Zentry', label: 'ZENTRY' },
              { src: cup, alt: 'Brewery', label: 'BREWERY' },
            ].map(({ src, alt, label }) => (
              <div className="icon-item" key={label}>
                <img src={src} alt={alt} className="icon" />
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <div className="container">
          <h2 className="section-title1 text-center text-2xl font-semibold">Industries We Serve</h2>
          <p className="text-xl text-gray-600 font-normal leading-7 mt-4 mb-8 text-center max-w-2xl mx-auto">
            From restaurants to wellness centers, we tailor our AI-native service around your business use case.
          </p>
          <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: spoon, alt: 'spoon', title: 'Restaurants', text: 'We make reservations simple and increase booking conversion by seamlessly confirming tables.', items: ['Table bookings', 'Special requests', 'Party reservations'] },
              { src: gym, alt: 'gym', title: 'Gyms & Wellness', text: 'Never lose a client to a missed call. Our AI books and schedules classes 24/7.', items: ['Class booking', 'Personal training', 'Wellness check'] },
              { src: heartblue, alt: 'heartblue', title: 'Medical Clinics', text: 'Make scheduling patient appointments quicker, easier, and more efficient with AI-driven calling.', items: ['Patient scheduling', 'Appointment reminders', 'Medical referrals'] },
            ].map(({ src, alt, title, text, items }) => (
              <div className="feature-card" key={title}>
                <div className="icon-wrapper">
                  <img src={src} alt={alt} className="icon-image" />
                </div>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-text">{text}</p>
                <ul className="feature-list">
                  {items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="benefits">
        <div className="container">
          <h1 className="section-titlee" style={{ fontSize: '2.1rem', fontWeight: '600', alignItems: 'center' }}>Zero effort, maximum growth</h1>
          <p className="section-subtitle">Going live takes less than 10 minutes. No coding. Just install. We do the rest.</p>
          <div className="benefits-grid">
            {[
              { src: rocket, alt: 'rocket', title: 'DEPLOY', text: 'Get started in minutes. No coding required. Our AI integrates seamlessly with your existing systems.' },
              { src: typhoon1, alt: 'typhoon', title: 'AUTOMATE', text: 'AI handles booking 24/7 without manual follow-ups — instant confirmations every time.' },
              { src: grow, alt: 'grow', title: 'SCALE', text: 'Effortlessly scale alongside your business without adding more staff or operational overhead.' },
            ].map(({ src, alt, title, text }) => (
              <div className="benefit-card" key={title}>
                <div className="icon-wrapper-dark">
                  <img src={src} alt={alt} className="icon-white" />
                </div>
                <h3 className="benefit-title">{title}</h3>
                <p className="benefit-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Status ── */}
      <section className="booking-status">
        <div className="container">
          <h2 className="section-titles">Check Your Booking Status</h2>
          <p className="section-subtitles">Enter your email and/or phone number to view your bookings.</p>

          <div className="status-card">
            <form onSubmit={handleStatusCheck} className="form-fields">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
                value={statusEmail}
                onChange={(e) => { setStatusEmail(e.target.value); setStatusError(''); }}
              />
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="input-field"
                value={statusPhone}
                onChange={(e) => { setStatusPhone(e.target.value); setStatusError(''); }}
              />
              <button type="submit" className="btn-submit" disabled={statusLoading}>
                {statusLoading ? 'Checking…' : 'Check Status'}
              </button>
            </form>

            {statusError && (
              <div className="lp-feedback lp-feedback--error">
                <AlertCircle size={15} /> {statusError}
              </div>
            )}

            {bookings !== null && (
              <div className="status-results">
                <h3 className="status-results-title">Your Bookings</h3>
                {bookings.length === 0 ? (
                  <p className="status-empty">No bookings found for the provided information.</p>
                ) : (
                  <div className="booking-list">
                    {bookings.map((booking, i) => (
                      <div key={booking.id ?? i} className="booking-item">
                        <div className="booking-item-left">
                          <h4 className="booking-name" style={{ textAlign: 'left' }}>
                            {booking.business_name ?? booking.businessName ?? booking.service_name ?? booking.service ?? 'Booking'}
                            <span className={`booking-status-badge ${(booking.status ?? '').toLowerCase()}`}>
                            {booking.status ?? 'Pending'}
                            </span>
                          </h4>
                          

                          {/* Date */}
                          <p className="booking-meta" style={{ textAlign: 'left' }}>
                            Booking Date:{' '}
                            {(() => {
                              const raw =
                                booking.date ??
                                booking.booking_date ??
                                booking.bookingDate ??
                                booking.scheduled_date ??
                                booking.start_time ??       // sometimes date+time are combined
                                booking.appointment_date ??
                                null;
                              if (!raw) return 'N/A';
                              const d = new Date(raw);
                              return isNaN(d)
                                ? raw                        // show as-is if not parseable
                                : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                            })()}
                          </p>

                          {/* Time */}
                          <p className="booking-meta" style={{ textAlign: 'left' }}>
                            Time:{' '}
                            {(() => {
                              const raw =
                                booking.time ??
                                booking.booking_time ??
                                booking.bookingTime ??
                                booking.start_time ??
                                booking.appointment_time ??
                                null;
                              if (!raw) return 'N/A';
                                const d = new Date(raw);
                                return isNaN(d)
                                  ? raw                        // show as-is (e.g. "14:30")
                                  : d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                              })()}
                            </p>

                          {/* Guests (optional) */}
                          {(booking.guests ?? booking.guest_count ?? booking.num_guests) != null && (
                            <p className="booking-meta" style={{ textAlign: 'left' }}>
                              Guests: {booking.guests ?? booking.guest_count ?? booking.num_guests}
                            </p>
                          )}
                        </div>

                        

                        <button className="btn-review" style={{ background: 'blue' }}>Review</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-titles">Contact Us</h2>

          <div className="contact-grid">
            {/* Info column */}
            <div className="contact-info">
              {[
                { Icon: Phone, label: 'Phone', value: platformContact.contact_phone },
                { Icon: Mail, label: 'Email', value: platformContact.contact_email },
                { Icon: MapPin, label: 'Address', value: platformContact.contact_address },
              ].map(({ Icon, label, value }) => (
                <div className="contact-item card" key={label}>
                  <div className="contact-icon"><Icon className="icon" /></div>
                  <div>
                    <h3 className="contact-label">{label}</h3>
                    <p className="contact-value" style={{ whiteSpace: 'pre-line' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="form-card">
              <form onSubmit={handleSendMessage} className="form-fields" noValidate>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="input-field"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  rows="4"
                  className="textarea-field"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <button type="submit" className="btn-submit" disabled={contactLoading}>
                  {contactLoading ? 'Sending…' : 'Send Message'}
                </button>
              </form>

              {/* Feedback messages */}
              {contactSuccess && (
                <div className="lp-feedback lp-feedback--success">
                  <CheckCircle size={15} /> {contactSuccess}
                </div>
              )}
              {contactError && (
                <div className="lp-feedback lp-feedback--error">
                  <AlertCircle size={15} /> {contactError}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo">
              <div className="logo">
                <img src={logo} alt="Logo" />
                <span>AI Reservation &amp; CRM System</span>
              </div>
              <p>Your 24/7 AI-powered receptionist that never misses a booking.</p>
              <div className="social-icons">
                {[
                  { src: tel, alt: 'telegram' },
                  { src: fb, alt: 'facebook' },
                  { src: lin, alt: 'linkedin' },
                  { src: insta, alt: 'instagram' },
                ].map(({ src, alt }) => (
                  <div key={alt}>
                    <img src={src} alt={alt} className="social-icon" />
                  </div>
                ))}
              </div>
            </div>

            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><a href="#">AI Receptionist</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#features" onClick={scrollTo('.features')}>Services</a></li>
                <li><a href="#hero" onClick={scrollTo('.hero')}>How it works</a></li>
                <li><a href="#status" onClick={scrollTo('.booking-status')}>Booking Status</a></li>
                <li><a href="#contact" onClick={scrollTo('.contact')}>Contact</a></li>
              </ul>
            </div>

            <div className="newsletter">
              <h4>Newsletter</h4>
              <p>Get the latest updates and news</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button type="submit" className="btn-submit">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 AI Reservation &amp; CRM System Inc. All rights reserved.</p>
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
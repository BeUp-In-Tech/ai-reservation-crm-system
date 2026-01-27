import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import '../assets/styles/addbusiness.css';

const AddBusinessPage = () => {
    const navigate = useNavigate();
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [contactName, setContactName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [timezone, setTimezone] = useState('Eastern Time (ET)');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');

    const handleSubmit = () => {
        // Handle form submission logic (like API call)
        alert('Business added successfully!');
    };

    return (
        <div className="add-business-container">
            <Sidebar />
            <main className="add-business-content">
                <header className="navbar">
                    <div className="navbar-content">
                        <h2 className="navbar-title">Add New Business</h2>
                        <p className="navbar-subtitle">
                            Set up a new business to use the AI Receptionist system.
                        </p>
                    </div>
                    <button className="close-btn" onClick={() => navigate('/adminBooking')}>✖</button>
                </header>
                <div className="form-container">


                    {/* Business Information */}
                    <section className="form-section">
                        <h3 className="section-title">Business Information</h3>
                        <div className="form-group">
                            <label>Business Name *</label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="e.g., Downtown Health Clinic"
                            />
                        </div>
                        <div className="form-group">
                            <label>Business Type *</label>
                            <select
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                            >
                                <option value="">Select business type...</option>
                                <option value="Health Clinic">Health Clinic</option>
                                <option value="Restaurant">Restaurant</option>
                                {/* Add other business types as needed */}
                            </select>
                        </div>
                    </section>

                    {/* Contact Details */}
                    <section className="form-section">
                        <h3 className="section-title">Contact Details</h3>
                        <div className="form-group">
                            <label>Contact Person *</label>
                            <input
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="Full name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="business@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone *</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="(555) 000-0000"
                            />
                        </div>
                        <div className="form-group">
                            <label>Street Address *</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="123 Main Street"
                            />
                        </div>
                        <div className="form-group">
                            <label>City *</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </div>
                        <div className="form-group">
                            <label>State *</label>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                            />
                        </div>
                        <div className="form-group">
                            <label>Zip Code *</label>
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="12345"
                            />
                        </div>
                    </section>

                    {/* Business Hours */}
                    <section className="form-section">
                        <h3 className="section-title">Business Hours</h3>
                        <div className="form-group">
                            <label>Timezone *</label>
                            <select
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                            >
                                <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                                <option value="Central Time (CT)">Central Time (CT)</option>
                                <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Opening Time *</label>
                            <input
                                type="time"
                                value={openingTime}
                                onChange={(e) => setOpeningTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Closing Time *</label>
                            <input
                                type="time"
                                value={closingTime}
                                onChange={(e) => setClosingTime(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="footer-buttons">
                        <button className="cancel-btn" onClick={() => navigate('/adminBooking')}>Cancel</button>
                        <button className="submit-btn" onClick={handleSubmit}>
                            Add Business
                        </button>
                    </div>
                </div>
                <div className="what-happens-next">
                    <h3>What happens next?</h3>
                    <ul>
                        <li>Your business will be added to the system immediately</li>
                        <li>An AI receptionist will be configured with default settings</li>
                        <li>You can customize AI responses and booking options in Settings</li>
                        <li>Contact information will be used for system notifications</li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default AddBusinessPage;

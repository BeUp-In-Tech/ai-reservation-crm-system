import React, { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    Settings,
    TrendingUp,
    LogOut,
    Play,
    Sliders
} from 'lucide-react';
import '../assets/styles/aiconfigaration.css';
import Sidebar from '../components/Sidebar';

export default function AIConfiguration() {
    const [selectedVoice, setSelectedVoice] = useState('Sophia');
    const [personalityTone, setPersonalityTone] = useState('Restaurant');
    const [confidenceThreshold, setConfidenceThreshold] = useState(70);
    const [behaviorOption, setBehaviorOption] = useState('Transfer to Human');
    const [personalityText, setPersonalityText] = useState('');
    const [timezone, setTimezone] = useState('Eastern Time (ET)');
    const [openingTime, setOpeningTime] = useState('09:00');
    const [closingTime, setClosingTime] = useState('17:00');
    const [businessType, setBusinessType] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [customServices, setCustomServices] = useState([]);
    const [prompt, setPrompt] = useState('');

    const [permissions, setPermissions] = useState({
        cancelBookings: true,
        rescheduleBookings: true,
        mentionPromotions: false
    });

    const voices = [
        { name: 'Sophia', gender: 'Female', accent: 'American', selected: true },
        { name: 'James', gender: 'Male', accent: 'British', selected: false },
        { name: 'Maria', gender: 'Female', accent: 'Spanish', selected: false },
        { name: 'Oliver', gender: 'Male', accent: 'Australian', selected: false }
    ];

    const toneOptions = ['Restaurant', 'Medical', 'Gym'];
    const behaviorOptions = ['Transfer to Human', 'Take a Message', 'Schedule Callback'];

    const handlePermissionToggle = (permission) => {
        setPermissions({
            ...permissions,
            [permission]: !permissions[permission]
        });
    };

    return (
        <div className="ai-config-container">
            <Sidebar />

            {/* Main Content */}
            <main className="ai-config-main-content">
                {/* Header */}
                <header className="ai-config-header">
                    <div>
                        <h1 className="ai-config-page-title">AI Configuration</h1>
                        <p className="ai-config-page-subtitle">Fine-tune your AI assistant's personality and operational boundaries.</p>
                    </div>
                    {/* <div className="ai-config-header-buttons">
                        <button className="ai-config-demo-btn">
                            <Play className="ai-config-play-icon" />
                            Live Demo
                        </button>
                        <button className="ai-config-save-btn">Save Changes</button>
                    </div> */}
                </header>

                {/* Service card */}
                <section className="ai-config-section">
                    <div className="select-business">
                        <div className="select-business-content">
                            <h2 className="select-business-title">Select Business</h2>
                            <div className="select-business-input">
                                <select
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                    required
                                >
                                    <option value="">Select business type...</option>
                                    <option value="Health Clinic">Health Clinic</option>
                                    <option value="Restaurant">Restaurant</option>
                                    {/* Dynamically add custom services */}
                                    {customServices.map((service, index) => (
                                        <option key={index} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                    {/* <option value="Other">Other (Custom)</option> */}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Select Services */}
                    <div className="ai-config-select-services">
                        <div className="select-services-content">
                            <h2 className="select-services-title">Select Services</h2>
                            <div className="select-services-input">
                                <select
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    required
                                >
                                    <option value="">Select service...</option>
                                    <option value="Booking">Booking</option>
                                    <option value="Ordering">Ordering</option>
                                    {/* <option value="Other">Other (Custom)</option> */}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Prompt */}
                    <div className="ai-config-prompt">
                        <div className="ai-config-prompt-content">
                            <h2 className="ai-config-prompt-title">Prompt</h2>
                            <div className="ai-config-prompt-input">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter your prompt here..."
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    {/* Business Hours */}
                    <h2 className="ai-config-section-titleB">Business Hours</h2>
                    <div className="form-group">
                        <label>Timezone *</label>
                        <select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Closing Time *</label>
                        <input
                            type="time"
                            value={closingTime}
                            onChange={(e) => setClosingTime(e.target.value)}
                            required
                        />
                    </div>
                </section>

                {/* Select Voice Section */}
                <section className="ai-config-section">
                    <h2 className="ai-config-section-title">Select Voice</h2>
                    {/* <p className="ai-config-section-subtitle">Choose the voice for your AI receptionist</p> */}

                    <div className="voice-grid">
                        {voices.map((voice) => (
                            <div
                                key={voice.name}
                                className={`voice-card ${selectedVoice === voice.name ? 'selected' : ''}`}
                                onClick={() => setSelectedVoice(voice.name)}
                            >
                                <div className="voice-card-content">
                                    <h3 className="voice-name">{voice.name}</h3>
                                    <div className="voice-details">
                                        <span className="voice-detail">{voice.gender}</span>
                                        <span className="voice-detail-separator">•</span>
                                        <span className="voice-detail">{voice.accent}</span>
                                    </div>
                                    <button className="voice-preview-btn">
                                        <Play className="voice-preview-icon" />
                                        Preview
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Personality & Tone Section */}
                {/* <section className="ai-config-section">
                    <h2 className="ai-config-section-title">Personality & Tone</h2>
                    <p className="ai-config-section-subtitle">Define how your AI should communicate</p>

                    <div className="tone-buttons">
                        {toneOptions.map((tone) => (
                            <button
                                key={tone}
                                className={`tone-btn ${personalityTone === tone ? 'active' : ''}`}
                                onClick={() => setPersonalityTone(tone)}
                            >
                                {tone}
                            </button>
                        ))}
                    </div>

                    <textarea
                        className="personality-textarea"
                        placeholder="e.g., You are a friendly receptionist for 'Blue Grill Restaurant'. Be polite and always prioritize bookings."
                        value={personalityText}
                        onChange={(e) => setPersonalityText(e.target.value)}
                        rows="4"
                    />
                </section> */}

                {/* Behavior Settings Section */}
                {/* <section className="ai-config-section">
                    <h2 className="ai-config-section-title">Behavior Settings</h2>

                    <div className="behavior-setting">
                        <div className="behavior-header">
                            <label className="behavior-label">Confidence Threshold</label>
                            <span className="confidence-value">{confidenceThreshold}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={confidenceThreshold}
                            onChange={(e) => setConfidenceThreshold(e.target.value)}
                            className="confidence-slider"
                        />
                        <div className="slider-labels">
                            <span className="slider-label">More cautious</span>
                            <span className="slider-label">More confident</span>
                        </div>
                    </div>

                    <div className="behavior-setting">
                        <label className="behavior-label">When AI Can't Handle Request</label>
                        <div className="behavior-options">
                            {behaviorOptions.map((option) => (
                                <button
                                    key={option}
                                    className={`behavior-option-btn ${behaviorOption === option ? 'selected' : ''}`}
                                    onClick={() => setBehaviorOption(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Permissions Section */}
                <section className="ai-config-section">
                    <h2 className="ai-config-section-title">Permissions</h2>
                    {/* <p className="ai-config-section-subtitle">Control what your AI can do</p> */}

                    <div className="permissions-list">
                        <div className="permission-item">
                            <div className="permission-info">
                                <h3 className="permission-title">Cancel Bookings</h3>
                                <p className="permission-description">AI can process cancellations</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={permissions.cancelBookings}
                                    onChange={() => handlePermissionToggle('cancelBookings')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="permission-item">
                            <div className="permission-info">
                                <h3 className="permission-title">Reschedule Bookings</h3>
                                <p className="permission-description">AI can move appointments</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={permissions.rescheduleBookings}
                                    onChange={() => handlePermissionToggle('rescheduleBookings')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="permission-item">
                            <div className="permission-info">
                                <h3 className="permission-title">Mention Promotions</h3>
                                <p className="permission-description">AI can mention running deals</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={permissions.mentionPromotions}
                                    onChange={() => handlePermissionToggle('mentionPromotions')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import { Pencil, XCircle, Users, UserPlus, MoreVertical } from 'lucide-react';
import '../assets/styles/settings.css';
import save from '../assets/save.png';
import business from '../assets/business.png';
import ai from '../assets/AI.png';
import notification from '../assets/notification.png';
import booking from '../assets/booking.png';
import sms from '../assets/chatting.png';
import email from '../assets/email.png';
import whatsappIcon from '../assets/whatsapp.png';

const SettingsPage = () => {
    const [businessName, setBusinessName] = useState('Modern Dental Care');
    const [industry, setIndustry] = useState('Dental');
    const [operatingHours, setOperatingHours] = useState('09:00 AM - 06:00 PM');
    const [timezone, setTimezone] = useState('GMT');
    const [minNotice, setMinNotice] = useState(24);
    const [maxPerSlot, setMaxPerSlot] = useState(1);
    const [cancellationPolicy, setCancellationPolicy] = useState(
        'Cancellations must be made at least 24 hours in advance to avoid a service fee.'
    );

    // Toggle state for Notification Channels
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(true);
    const [whatsapp, setWhatsapp] = useState(true);

    const teamMembers = [
        {
            name: "Esther Howard",
            email: "esther@dentist.com",
            role: "Admin",
            status: "Active",
            avatar: "EH",
            avatarColor: "#8b5cf6"
        },
        {
            name: "Cameron Williamson",
            email: "cameron@dentist.com",
            role: "Editor",
            status: "Active",
            avatar: "CW",
            avatarColor: "#ec4899"
        },
        {
            name: "Jacob Jones",
            email: "jacob@dentist.com",
            role: "Editor",
            status: "Active",
            avatar: "JJ",
            avatarColor: "#f59e0b"
        }
    ];

    return (
        <div className="settings-container">
            <Sidebar />
            <main className="settings-content">
                {/* Header */}
                <header className="content-header">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search interactions..."
                            className="search-input"
                        />
                    </div>
                    <div className="button-container">
                        <button className="discard-btn">
                            Discard Changes
                        </button>
                        <button className="save-btn">
                            <img src={save} alt="save" className="save-icon" />
                            Save Changes
                        </button>
                    </div>
                </header>
                {/* Business Profile Section */}
                <div className="settings-body">
                    <section className="section">
                        <h2 className="section-title">
                            <img src={business} alt="business" className="business-icon" />
                            Business Profile
                        </h2>
                        <div className="section-content">
                            <div className='content-row'>
                                <div className="input-group">
                                    <label>Business Name</label>
                                    <input
                                        type="text"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Industry</label>
                                    <input
                                        type="text"
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='content-column'>
                                <div className="input-group1">
                                    <label>Operating Hours</label>
                                    <input
                                        type="text"
                                        value={operatingHours}
                                        onChange={(e) => setOperatingHours(e.target.value)}
                                    />
                                </div>
                                <div className="input-group2">
                                    <label>Time Zone</label>
                                    <select onChange={(e) => setTimezone(e.target.value)} value={timezone}>
                                        <option value="GMT">GMT</option>
                                        <option value="EST">EST</option>
                                        <option value="PST">PST</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AI Agent Personality Section */}
                    <section className="section">
                        <h2 className="section-title">
                            <img src={ai} alt="ai" className="ai-icon" />
                            AI Agent Personality
                        </h2>
                        <div className="section-content">
                            <div className='content-column1'>
                                <div className="input-group">
                                    <label>AI Agent Name</label>
                                    <select>
                                        <option value="Dr. Ava">Dr. Ava</option>
                                        <option value="Dr. John">Dr. John</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Tone of Voice</label>
                                    <select>
                                        <option value="Professional & Empathetic">Professional & Empathetic</option>
                                        <option value="Casual & Friendly">Casual & Friendly</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Business Name for AI</label>
                                    <input
                                        type="text"
                                        value="Modern Dental Care"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='content-row1'>
                                <div className="input-group">
                                    <label>AI Message</label>
                                    <textarea
                                        value="Hello! Thank you for calling Modern Dental Care."
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Booking Configuration Section */}
                    <section className="section">
                        <h2 className="section-title">
                            <img src={booking} alt="booking" className="booking-icon" />
                            Booking Configuration
                        </h2>
                        <div className="section-content">
                            <div className='content-row3'>
                                <div className="input-group">
                                    <label>Min Notice</label>
                                    <input
                                        type="number"
                                        value={minNotice}
                                        onChange={(e) => setMinNotice(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Max Per Slot</label>
                                    <input
                                        type="number"
                                        value={maxPerSlot}
                                        onChange={(e) => setMaxPerSlot(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='content-column3'>
                                <div className="input-group">
                                    <label>Cancellation Policy</label>
                                    <textarea
                                        value={cancellationPolicy}
                                        onChange={(e) => setCancellationPolicy(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Notification Channels Section */}
                    <section className="section">
                        <h2 className="section-title">
                            <img src={notification} alt="notification" className="notification-icon" />
                            Notification Channels
                        </h2>
                        <div className="section-content">
                            <div className="input-group toggle-group">

                                <label><img src={email} alt="pop" className="pop-icon" />Email Alerts</label>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={emailAlerts}
                                        onChange={() => setEmailAlerts(!emailAlerts)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="input-group toggle-group">
                                <label><img src={sms} alt="sms" className="sms-icon" />SMS Alerts</label>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={smsAlerts}
                                        onChange={() => setSmsAlerts(!smsAlerts)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="input-group toggle-group">
                                <label><img src={whatsappIcon} alt="whatsapp" className="whatsapp-icon" />WhatsApp</label>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={whatsapp}
                                        onChange={() => setWhatsapp(!whatsapp)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </section>
                </div>
                {/* <div className="team-permission-card">
                    <div className="team-header">
                        <div className="team-header-left">
                            <div className="team-icon-wrapper">
                                <Users className="team-icon" />
                            </div>
                            <div className="team-header-info">
                                <h3 className="team-title">Team & Permission</h3>
                                <p className="team-subtitle">Manage User Role & Access</p>
                            </div>
                        </div>
                        <button className="invite-member-btn">
                            <UserPlus className="invite-icon" />
                            Invite Member
                        </button>
                    </div>

                    <div className="team-content">
                        <table className="team-members-table">
                            <thead>
                                <tr>
                                    <th>MEMBER</th>
                                    <th>ROLE</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((member, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="member-info">
                                                <div
                                                    className="member-avatar"
                                                    style={{ backgroundColor: member.avatarColor }}
                                                >
                                                    {member.avatar}
                                                </div>
                                                <div className="member-details">
                                                    <p className="member-name">{member.name}</p>
                                                    <p className="member-email">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`role-tag ${member.role.toLowerCase()}`}>
                                                {member.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="status-tag">
                                                <span className="status-indicator"></span>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="action-menu-btn">
                                                <MoreVertical className="action-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </main>
        </div>
    );
};

export default SettingsPage;

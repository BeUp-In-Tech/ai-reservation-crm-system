import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/admin-dashboard.css";
import Sidebar from "../components/Sidebar";

const AdminProfileDashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@example.com",
        role: "Super Admin",
        phone: "+1 (555) 123-4567",
        company: "AI Reservation & CRM System",
        timezone: "Eastern Time (ET)",
    });

    const stats = useMemo(
        () => ({
            totalBusinesses: 12,
            activeBusinesses: 9,
            totalBookings: 1842,
            conversions: 312,
            recentInteractions: [
                { name: "Downtown Health Clinic", status: "Converted", time: "2m ago", interaction: "Booked appointment for 3:00 PM" },
                { name: "Sunset Restaurant", status: "Hands-off", time: "15m ago", interaction: "Customer asked for menu details" },
                { name: "Elite Fitness Center", status: "Converted", time: "1h ago", interaction: "Signed up for monthly membership" },
                { name: "City Dental Care", status: "Converted", time: "3h ago", interaction: "Rescheduled cleaning appointment" },
            ],
        }),
        []
    );

    const handleChange = (key, value) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert("Profile updated successfully!");
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            {/* Top Bar */}
            <div className="admin-topbar">
                <div>
                    <h1 className="admin-title">Admin Profile</h1>
                    <p className="admin-subtitle">Manage your account, preferences, and activity.</p>
                </div>

                <div className="admin-topbar-actions">
                    <button className="btn-secondary" type="button">
                        Download Report
                    </button>
                    <button className="btn-primary" type="button">
                        Update Profile
                    </button>
                </div>

            </div>

            {/* Grid Layout */}
            <div className="admin-grid">
                {/* Left Column: Profile Card */}
                <div className="card profile-card">
                    <div className="profile-header">
                        <div className="avatar">{profile.name?.[0]?.toUpperCase() || "A"}</div>

                        <div className="profile-meta">
                            <h2 className="profile-name">{profile.name}</h2>
                            <p className="profile-role">{profile.role} • {profile.company}</p>

                            <div className="profile-badges">
                                <span className="pill pill-green">Online</span>
                                <span className="pill pill-blue">Full Access</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-info">
                        <div className="info-row">
                            <span className="info-label">Email</span>
                            <span className="info-value">{profile.email}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Phone</span>
                            <span className="info-value">{profile.phone}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Timezone</span>
                            <span className="info-value">{profile.timezone}</span>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="btn-secondary w-full" type="button">
                            Change Password
                        </button>
                        {/* <button
                            className="btn-danger w-full"
                            type="button"
                            onClick={() => navigate('/')}
                        >
                            Logout
                        </button> */}
                    </div>
                    {/* Settings Form */}
                    <div className="card settings-card">
                        <h3>Account Settings</h3>

                        <form onSubmit={handleSave} className="form">
                            <div className="form-grid">
                                <div className="form-field">
                                    <label>Full Name</label>
                                    <input
                                        value={profile.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Email</label>
                                    <input
                                        value={profile.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Phone</label>
                                    <input
                                        value={profile.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="Enter phone"
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Timezone</label>
                                    <select
                                        value={profile.timezone}
                                        onChange={(e) => handleChange("timezone", e.target.value)}
                                    >
                                        <option>Eastern Time (ET)</option>
                                        <option>Central Time (CT)</option>
                                        <option>Mountain Time (MT)</option>
                                        <option>Pacific Time (PT)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column */}
                <div className="right-col">
                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="card stat-card">
                            <p className="stat-label">Total Businesses</p>
                            <p className="stat-value">{stats.totalBusinesses}</p>
                            <p className="stat-sub">All businesses in system</p>
                        </div>

                        <div className="card stat-card">
                            <p className="stat-label">Active Businesses</p>
                            <p className="stat-value">{stats.activeBusinesses}</p>
                            <p className="stat-sub">Currently running AI</p>
                        </div>

                        <div className="card stat-card">
                            <p className="stat-label">Total Bookings</p>
                            <p className="stat-value">{stats.totalBookings}</p>
                            <p className="stat-sub">AI generated bookings</p>
                        </div>

                        <div className="card stat-card">
                            <p className="stat-label">Conversions</p>
                            <p className="stat-value">{stats.conversions}</p>
                            <p className="stat-sub">Converted interactions</p>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="card recent-activity-card">
                        <div className="card-head">
                            <h3>Recent AI Interactions</h3>
                            <button type="button" className="btn-link">
                                View All
                            </button>
                        </div>

                        <div className="activity-table">
                            {stats.recentInteractions.map((a, idx) => (
                                <div key={idx} className="activity-row">
                                    <div className="activity-left">
                                        <p className="activity-name">{a.name}</p>
                                        <p className="activity-interaction">{a.interaction}</p>
                                    </div>

                                    <div className="activity-right">
                                        <span className={`status-badges ${a.status.toLowerCase().replace(" ", "-")}`}>
                                            {a.status}
                                        </span>
                                        <span className="activity-time">{a.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AdminProfileDashboard;

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';  // Import Chart.js
import Sidebar from '../components/Sidebar.jsx';
import '../assets/styles/analytics.css';
import download from '../assets/download.png';

// Dummy data for analytics
const stats = {
    totalCalls: 1284,
    bookings: 412,
    conversion: 32.1,
    revenue: 125450,
    bookingTrends: [100, 120, 115, 130, 140, 160, 150],
    callVolumeVsConversion: [
        { week: 1, calls: 200, converted: 150 },
        { week: 2, calls: 220, converted: 160 },
        { week: 3, calls: 230, converted: 170 },
        { week: 4, calls: 250, converted: 180 },
    ],
    bookingSource: { voiceAI: 65, human: 35 },
    recentInteractions: [
        { name: 'Wade Warren', status: 'Converted', time: '12 min ago', interaction: 'Personal Training Inquiry', type: 'Voice' },
        { name: 'Albert Flores', status: 'Hands-Off', time: '45 min ago', interaction: 'Membership Cancellation', type: 'Message' },
        { name: 'Robert Fox', status: 'Converted', time: '2 hours ago', interaction: 'Personal Training Inquiry', type: 'Voice' },
        { name: 'Guy Hawkins', status: 'Converted', time: '3 hours ago', interaction: 'Yoga Class Booking', type: 'Voice' },
    ],
};

const Analytics = () => {
    const [dateRange] = useState('Last 30 Days'); // Date range filter state

    // Pie chart data for Booking Source
    const bookingSourceData = {
        labels: ['Voice AI', 'Human'],
        datasets: [
            {
                data: [stats.bookingSource.voiceAI, stats.bookingSource.human],
                backgroundColor: ['#2563EB', '#4B5563'],
                hoverOffset: 4,
            },
        ],
    };

    // Line chart data for Booking Trends
    const bookingTrendsData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Booking Trends',
                data: stats.bookingTrends,
                borderColor: '#2563EB',
                fill: false,
            },
        ],
    };

    // Bar chart data for Call Volume vs Conversion Rate
    const callVolumeData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Calls',
                data: stats.callVolumeVsConversion.map((data) => data.calls),
                backgroundColor: '#60A5FA',
            },
            {
                label: 'Converted',
                data: stats.callVolumeVsConversion.map((data) => data.converted),
                backgroundColor: '#2563EB',
            },
        ],
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className='content-header'>
                    <div className='search-container'>
                        <input type="text" placeholder='Search interactions...' className='search-input' />
                    </div>
                    <button className="export-btn">
                        <img src={download} alt="download" className="download-icon" />
                        Export Data
                    </button>
                </header>
                {/* Dashboard Overview */}
                <div className="dashboard-title-section">
                    <h1 className="dashboard-title">Advanced Analytics</h1>
                    <button className="date-filter-btn">
                        <span>{dateRange}</span>
                        <ChevronDown className="chevron-icon" />
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Total Calls</div>
                        <div className="stat-value">{stats.totalCalls}</div>
                        <div className="stat-change">+12%</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Bookings</div>
                        <div className="stat-value">{stats.bookings}</div>
                        <div className="stat-change">+4%</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Conversion</div>
                        <div className="stat-value">{stats.conversion}%</div>
                        <div className="stat-change">+12%</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Revenue</div>
                        <div className="stat-value">${stats.revenue}</div>
                        <div className="stat-change">+6%</div>
                    </div>
                </div>

                {/* Analytics Charts */}
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Booking Trends</h3>
                        <Line data={bookingTrendsData} />
                    </div>
                    <div className="chart-card">
                        <h3>Call Volume vs Conversion Rate</h3>
                        <Bar data={callVolumeData} />
                    </div>
                    <div className="chart-card">
                        <h3>Booking Source</h3>
                        <Pie data={bookingSourceData} />
                    </div>
                </div>

                {/* Recent AI Interactions */}
                <div className="recent-activity-card">
                    <h3>Recent AI Interactions</h3>
                    {stats.recentInteractions.map((activity, index) => (
                    <div key={index} className="activity-row">
                        <span className="activity-name">{activity.name}</span>
                        <span className={`status-badge ${activity.status.toLowerCase()}`}>
                            {activity.status}
                        </span>
                        <span className="activity-time">{activity.time}</span>
                        <span>{activity.interaction}</span>
                    </div>
                ))}
                </div>
            </main>
        </div>
    );
};

export default Analytics;

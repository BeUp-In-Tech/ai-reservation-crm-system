import React, { useState } from 'react';
import {
  Search,
  Download,
  ChevronDown,
  Bell
} from 'lucide-react';
import '../assets/styles/adminDashboard.css';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'TOTAL CALLS', value: '1284', change: '+12%', color: '#2563eb' },
    { label: 'BOOKING', value: '412', change: '+8%', color: '#2563eb' },
    { label: 'CONVERSION', value: '32.1%', change: '+12%', color: '#f59e0b' },
    { label: 'REVENUE', value: '$125,450', change: '+12%', color: '#10b981' }
  ];

  const recentActivity = [
    {
      customer: 'Boby Fisher',
      phone: '(702) 555-0122',
      hover: 'Dental Check up',
      time: '07:59 pm',
      status: 'Booked',
      handle: 'AI'
    },
    {
      customer: 'Magnas Karlson',
      phone: '(704) 555-0127',
      hover: 'Pricing Inquiry',
      time: '03:48 am',
      status: 'Handled',
      handle: 'AI'
    },
    {
      customer: 'Hikaru Nakamura',
      phone: '(603) 555-0123',
      hover: 'Emergency',
      time: '01:34 pm',
      status: 'Transferred',
      handle: 'Human'
    },
    {
      customer: 'Gukesh Dommaraju',
      phone: '(207) 555-0119',
      hover: 'Rescheduling',
      time: '01:08 pm',
      status: 'Booked',
      handle: 'AI'
    }
  ];

  const callVolumeData = [
    { day: 'M', value: 45 },
    { day: 'T', value: 62 },
    { day: 'W', value: 100 },
    { day: 'T', value: 75 },
    { day: 'F', value: 58 },
    { day: 'S', value: 68 },
    { day: 'S', value: 80 }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="content-header">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search interactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="export-btn">
            <Download className="export-icon" />
            Export Data
          </button>
        </header>

        {/* Dashboard Title */}
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <button className="date-filter-btn">
            <span>Last 30 Days</span>
            <ChevronDown className="chevron-icon" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-progress">
                <div
                  className="stat-progress-bar"
                  style={{
                    width: '60%',
                    backgroundColor: stat.color
                  }}
                ></div>
              </div>
              <div className="stat-change">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Recent Activity */}
          <div className="activity-card">
            <div className="card-header">
              <h2 className="card-title">Recent Activity</h2>
              <a href="#" className="view-all-link">View all Logs</a>
            </div>

            <div className="activity-table">
              <div className="table-header">
                <div className="th">Customer</div>
                <div className="th">Hover</div>
                <div className="th">Time</div>
                <div className="th">Status</div>
                <div className="th">Handle</div>
              </div>

              {recentActivity.map((activity, index) => (
                <div key={index} className="table-row">
                  <div className="td">
                    <div className="customer-name">{activity.customer}</div>
                    <div className="customer-phone">{activity.phone}</div>
                  </div>
                  <div className="td">{activity.hover}</div>
                  <div className="td">{activity.time}</div>
                  <div className="td">
                    <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="td">
                    <span className={`handle-badge handle-${activity.handle.toLowerCase()}`}>
                      {activity.handle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* AI Efficiency Card */}
            <div className="ai-efficiency-card">
              <h2 className="efficiency-title">AI Efficiency</h2>
              <div className="efficiency-rate">
                <span className="rate-label">Automation Rate</span>
                <span className="rate-value">94.2%</span>
              </div>
              <div className="efficiency-bar">
                <div className="efficiency-bar-fill"></div>
              </div>
              <p className="efficiency-text">
                Your AI successfully handled 1,209 calls this month without requiring human intervention. This saved approximately 84 hours of staff time.
              </p>
            </div>

            {/* Call Volume Trends */}
            <div className="call-volume-card">
              <h2 className="volume-title">Call Volume Trends</h2>
              <div className="volume-chart">
                {callVolumeData.map((data, index) => (
                  <div key={index} className="chart-bar-wrapper">
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar"
                        style={{ height: `${data.value}%` }}
                      ></div>
                    </div>
                    <div className="chart-label">{data.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
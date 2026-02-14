import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Settings,
  TrendingUp,
  LogOut,
  Search,
  Plus,
  CalendarDays,
  SlidersHorizontal,
  Phone,
  MessageSquare,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Sparkles
} from 'lucide-react';
import '../assets/styles/adminBooking.css';
import Sidebar from '../components/Sidebar.jsx';
import { Link } from 'react-router-dom';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Confirmed', 'Pending', 'Cancelled'];

  const bookings = [
    {
      id: 1,
      customer: 'Sarah Martinez',
      phone: '(555) 012-3456',
      initials: 'SM',
      color: '#3b82f6',
      service: 'Personal Training Session',
      date: 'Today, 2:30 PM',
      duration: '60 mins',
      source: 'AI PHONE',
      status: 'Confirmed'
    },
    {
      id: 2,
      customer: 'Michael Chen',
      phone: '(555) 012-8899',
      initials: 'MC',
      color: '#f97316',
      service: 'Table Reservation - 6 Guests',
      date: 'Nov 23, 7:00 PM',
      duration: '120 mins',
      source: 'AI CHAT',
      status: 'Pending'
    },
    {
      id: 3,
      customer: 'Jessica Brown',
      phone: '(555) 012-7744',
      initials: 'JB',
      color: '#6b7280',
      service: 'Yoga Class - Morning Session',
      date: 'Nov 24, 09:00 AM',
      duration: '45 mins',
      source: 'MANUAL',
      status: 'Cancelled'
    },
    {
      id: 4,
      customer: 'David Thompson',
      phone: '(555) 012-9233',
      initials: 'DT',
      color: '#06b6d4',
      service: 'Private Dining Experience',
      date: 'Today, 8:00 PM',
      duration: '180 mins',
      source: 'AI PHONE',
      status: 'Confirmed'
    },
    {
      id: 5,
      customer: 'Emma Wilson',
      phone: '(555) 012-4521',
      initials: 'EW',
      color: '#a855f7',
      service: 'Spa & Wellness Package',
      date: 'Nov 25, 11:00 AM',
      duration: '90 mins',
      source: 'AI CHAT',
      status: 'Confirmed'
    },
    {
      id: 6,
      customer: 'James Rodriguez',
      phone: '(555) 012-7768',
      initials: 'JR',
      color: '#10b981',
      service: 'CrossFit Group Training',
      date: 'Today, 5:30 PM',
      duration: '60 mins',
      source: 'AI PHONE',
      status: 'Pending'
    }
  ];

  return (
    <div className="bookings-container">
      <Sidebar />

      {/* Main Content */}
      <main className="bookings-main-content">
        {/* Header */}
        <header className="bookings-header">
          <div>
            <h1 className="bookings-page-title">Bookings</h1>
            <p className="bookings-page-subtitle">Manage and monitor all incoming appointments.</p>
          </div>
          {/* <Link to="/addbusiness">
            <button className="bookings-new-business-btn">
              <Plus className="bookings-plus-icon" />
              New Business
            </button>
          </Link> */}
        </header>

        {/* AI Insight Card */}
        <div className="bookings-ai-insight">
          <div className="bookings-ai-insight-icon">
            <Sparkles className="sparkles-icon" />
          </div>
          <div className="bookings-ai-insight-content">
            <h3 className="bookings-ai-insight-title">AI Insight</h3>
            <p className="bookings-ai-insight-text">
              Your AI Receptionist handled 85% of bookings today. Typical peak hours starting in 2 hours.
            </p>
          </div>
          <a href="/analytics" className="bookings-view-analytics">VIEW ANALYTICS</a>
        </div>

        {/* Stats Cards */}
        <div className="bookings-stats-grid">
          <div className="bookings-stat-card">
            <div className="bookings-stat-label">Total Bookings Today</div>
            <div className="bookings-stat-value">48</div>
            <div className="bookings-stat-change positive">+12% vs yesterday</div>
          </div>
          <div className="bookings-stat-card">
            <div className="bookings-stat-label">AI Managed</div>
            <div className="bookings-stat-value">41</div>
            <div className="bookings-stat-change positive">85.4% Efficiency</div>
          </div>
          <div className="bookings-stat-card">
            <div className="bookings-stat-label">Pending Actions</div>
            <div className="bookings-stat-value warning">7</div>
            <div className="bookings-stat-change warning">Requires review</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bookings-search-section">
          <div className="bookings-search-container">
            <Search className="bookings-search-icon" />
            <input
              type="text"
              placeholder="Search by customer, phone, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bookings-search-input"
            />
          </div>
          <div className="bookings-filter-buttons">
            <button className="bookings-date-filter">
              <CalendarDays className="filter-icon" />
              Jan 11 - Jan 18
            </button>
            <button className="bookings-filters-btn">
              <SlidersHorizontal className="filter-icon" />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bookings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`bookings-tab ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="bookings-table-card">
          <div className="bookings-table">
            <div className="bookings-table-header">
              <div className="bookings-th">CUSTOMER</div>
              <div className="bookings-th">SERVICE</div>
              <div className="bookings-th">DATE & TIME</div>
              <div className="bookings-th">SOURCE</div>
              <div className="bookings-th">STATUS</div>
              <div className="bookings-th">ACTIONS</div>
            </div>

            {bookings.map((booking) => (
              <div key={booking.id} className="bookings-table-row">
                <div className="bookings-td customer-cell">
                  <div className="customer-avatar" style={{ backgroundColor: booking.color }}>
                    {booking.initials}
                  </div>
                  <div className="customer-info">
                    <div className="customer-name">{booking.customer}</div>
                    <div className="customer-phone">{booking.phone}</div>
                  </div>
                </div>
                <div className="bookings-td">{booking.service}</div>
                <div className="bookings-td">
                  <div className="datetime-info">
                    <div className="date-text">{booking.date}</div>
                    <div className="duration-text">{booking.duration}</div>
                  </div>
                </div>
                <div className="bookings-td">
                  <div className="source-badge">
                    {booking.source === 'AI PHONE' && <Phone className="source-icon" />}
                    {booking.source === 'AI CHAT' && <MessageSquare className="source-icon" />}
                    <span>{booking.source}</span>
                  </div>
                </div>
                <div className="bookings-td">
                  <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="bookings-td">
                  <button className="action-menu-btn">
                    <MoreVertical className="more-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bookings-pagination">
            <div className="pagination-info">Showing 1 to 6 of 52 bookings</div>
            <div className="pagination-controls">
              <button className="pagination-btn">
                <ChevronLeft className="pagination-icon" />
              </button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <span className="pagination-dots">...</span>
              <button className="pagination-btn">9</button>
              <button className="pagination-btn">
                <ChevronRight className="pagination-icon" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
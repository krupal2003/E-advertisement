import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/AgencyHome.css';

export const AgencyHome = () => {
  return (
    <div className="agency-home-container">
      {/* Hero Section */}
      <section className="agency-hero">
        <div className="hero-content">
          <h1>Welcome to Your Advertising Dashboard</h1>
          <p className="welcome-message">
            Hello, <span className="user-name">Krupal</span>! Manage your advertising screens and maximize your earnings
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <h3>Total Screens</h3>
            <p className="stat-value">15</p>
            <p className="stat-label">Active advertising units</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <h3>Monthly Revenue</h3>
            <p className="stat-value">₹42,500</p>
            <p className="stat-label">Estimated earnings</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <h3>Bookings</h3>
            <p className="stat-value">8</p>
            <p className="stat-label">Active this month</p>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="action-section">
        <h2 className="section-title">Manage Your Advertising Network</h2>
        <div className="action-grid">
          <Link to="/agency/add-banner" className="action-card">
            <div className="card-icon">➕</div>
            <h3>Add New Screen</h3>
            <p>Register a new advertising unit to your network</p>
            <div className="card-arrow">→</div>
          </Link>
          
          <Link to="/agency/myscreen" className="action-card">
            <div className="card-icon">👁️</div>
            <h3>View All Screens</h3>
            <p>Manage your existing advertising inventory</p>
            <div className="card-arrow">→</div>
          </Link>
          
          <Link to="/agency/analytics" className="action-card">
            <div className="card-icon">📈</div>
            <h3>View Analytics</h3>
            <p>Track performance and earnings</p>
            <div className="card-arrow">→</div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why List With Us?</h2>
        <div className="features-grid">
          <div className="feature-card1">
            <div className="feature-icon">💸</div>
            <h3>Maximize Earnings</h3>
            <p>Our platform connects you with businesses looking for premium advertising space</p>
          </div>
          <div className="feature-card1">
            <div className="feature-icon">🔄</div>
            <h3>Easy Management</h3>
            <p>Update availability and pricing in real-time from your dashboard</p>
          </div>
          <div className="feature-card1">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Payments</h3>
            <p>Get paid reliably with our automated payment system</p>
          </div>
        </div>
      </section>
    </div>
  );
};
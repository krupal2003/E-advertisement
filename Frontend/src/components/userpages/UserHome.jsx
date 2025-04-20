import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/UserHome.css';

export const UserHome = () => {
  return (
    <div className="user-home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Amplify Your Business with Outdoor Advertising</h1>
          <p>Book premium advertising screens across multiple locations and reach thousands of potential customers daily</p>
          <Link to="/user/newbooking" className="cta-button">
            Start Booking Now
          </Link>
        </div>
      </section>

      <section className="booking-steps">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Select Location</h3>
            <p>Choose from our network of premium advertising screens across different states, cities, and areas</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Check Availability</h3>
            <p>Pick your desired dates and times for maximum visibility</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Enter Business Details</h3>
            <p>Tell us about your business and advertising needs</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Complete Payment</h3>
            <p>Secure your booking with our easy payment process</p>
          </div>
        </div>
      </section>

      <section className="ad-types">
        <h2>Our Advertising Solutions</h2>
        <div className="ad-types-grid">
          <div className="ad-type-card">
            <div className="ad-icon">📌</div>
            <h3>Unipole</h3>
            <p>Tall, single-pole billboards perfect for highway visibility and brand awareness campaigns</p>
          </div>
          <div className="ad-type-card">
            <div className="ad-icon">🖼️</div>
            <h3>Billboard</h3>
            <p>Classic large format advertising in urban areas for maximum exposure</p>
          </div>
          <div className="ad-type-card">
            <div className="ad-icon">🚧</div>
            <h3>Gantry</h3>
            <p>Overhead displays spanning across roads, ideal for high-impact messaging</p>
          </div>
          <div className="ad-type-card">
            <div className="ad-icon">📺</div>
            <h3>Digital</h3>
            <p>Dynamic digital displays with animated content and real-time updates</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial-card">
          <p>"Our restaurant saw a 40% increase in customers after running ads on digital billboards near our location."</p>
          <div className="testimonial-author">- Rahul Sharma, Cafe Owner</div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Grow Your Business?</h2>
        <Link to="/user/newbooking" className="cta-button">
          Book Your Advertising Space Today
        </Link>
      </section>
    </div>
  );
};
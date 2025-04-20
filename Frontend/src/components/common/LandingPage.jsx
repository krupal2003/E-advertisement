import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/LandingPage.css';

const LandingPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container2">
      {/* Header */}
      <header className="header1">
        <h1 className="logo">AdVision Platform</h1>
        <nav className="nav">
          <Link to="/login" className="btn login-btn" aria-label="Login">Login</Link>
          <Link to="/signup" className="btn signup-btn" aria-label="Sign Up">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="hero">
          <h2>Maximize Your Business</h2>
          <p>Create, Manage, and Optimize Your Digital Campaigns with Ease</p>
          <Link to="/login" className="btn get-started-btn" aria-label="Get Started">Get Started</Link>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Key Features</h2>
          <div className="features-container">
            <div className="feature-card">
              <h3>Ad Creation</h3>
              <p>Drag-and-drop builder with customizable templates and multimedia support.</p>
            </div>
            <div className="feature-card">
              <h3>Targeting & Segmentation</h3>
              <p>Define your audience with demographics, interests, and behaviors.</p>
            </div>
            <div className="feature-card">
              <h3>Real-time Analytics</h3>
              <p>Track impressions, clicks, and conversions with dynamic charts.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p>"AdVision has transformed the way we manage our campaigns. The analytics are top-notch!"</p>
              <h4>- Sarah Johnson, Marketing Manager</h4>
            </div>
            <div className="testimonial-card">
              <p>"The drag-and-drop builder is so intuitive. I can create ads in minutes!"</p>
              <h4>- Michael Lee, Small Business Owner</h4>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="cta">
          <h2>Ready to Take Your Business to the Next Level?</h2>
          <p>Join thousands of businesses using AdVision to grow their audience and increase revenue.</p>
          <Link to="/signup" className="btn cta-btn" aria-label="Sign Up Now">Sign Up Now</Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {currentYear} AdVision Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
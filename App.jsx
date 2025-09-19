import React, { useState, useEffect } from 'react';
import './styles/App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>DeepHull Diving</h1>
              <span className="tagline">Professional Underwater Services</span>
            </div>
            
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-list">
                <li><a href="#services" onClick={() => scrollToSection('services')}>Services</a></li>
                <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
                <li><a href="#quote" onClick={() => scrollToSection('quote')}>Get Quote</a></li>
              </ul>
            </nav>

            <div className="header-actions">
              <a href="tel:+19045700910" className="phone-link">
                <span className="phone-icon">📞</span>
                (904) 570-0910
              </a>
              <button className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Professional Underwater Hull Cleaning
              <span className="highlight">24/7 Emergency Service</span>
            </h1>
            <p className="hero-subtitle">
              Certified commercial divers serving Jacksonville, St. Augustine, and Ponte Vedra Beach
            </p>
            <div className="hero-actions">
              <a href="tel:+19045700910" className="btn btn-primary">
                Call Now: (904) 570-0910
              </a>
              <a href="#quote" className="btn btn-secondary" onClick={() => scrollToSection('quote')}>
                Get Free Quote
              </a>
            </div>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>24/7 Emergency Service</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✅</span>
                <span>Certified Commercial Divers</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚢</span>
                <span>All Vessel Types</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Professional underwater maintenance for all vessel types</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🧽</div>
              <h3>Hull Cleaning</h3>
              <p>Complete underwater hull cleaning to remove marine growth, barnacles, and debris for optimal vessel performance.</p>
              <ul>
                <li>Pressure washing</li>
                <li>Scraping and scrubbing</li>
                <li>Eco-friendly solutions</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">⚙️</div>
              <h3>Prop Polishing</h3>
              <p>Professional propeller polishing to restore efficiency and reduce fuel consumption.</p>
              <ul>
                <li>Stainless steel polishing</li>
                <li>Bronze prop maintenance</li>
                <li>Performance optimization</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🔋</div>
              <h3>Zinc Replacement</h3>
              <p>Sacrificial anode replacement to protect your vessel from galvanic corrosion.</p>
              <ul>
                <li>Zinc anode inspection</li>
                <li>Replacement installation</li>
                <li>Corrosion prevention</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🚨</div>
              <h3>Emergency Service</h3>
              <p>24/7 emergency underwater services for urgent marine maintenance needs.</p>
              <ul>
                <li>Emergency hull cleaning</li>
                <li>Propeller damage assessment</li>
                <li>Underwater inspections</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About DeepHull Diving</h2>
              <p>
                With years of experience in commercial diving and marine maintenance, 
                DeepHull Diving provides professional underwater services throughout 
                Northeast Florida. Our certified divers are equipped with the latest 
                tools and techniques to ensure your vessel receives the best care.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <h4>Certified Professionals</h4>
                  <p>All divers are certified commercial divers with extensive marine maintenance experience.</p>
                </div>
                <div className="about-feature">
                  <h4>24/7 Availability</h4>
                  <p>Emergency services available around the clock for urgent marine maintenance needs.</p>
                </div>
                <div className="about-feature">
                  <h4>Eco-Friendly</h4>
                  <p>We use environmentally safe cleaning solutions and follow best practices for marine conservation.</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span>Professional Diving Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p>Ready to schedule your underwater maintenance service?</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <h3>Phone</h3>
                <a href="tel:+19045700910">(904) 570-0910</a>
              </div>
              <div className="contact-item">
                <h3>Service Areas</h3>
                <p>Jacksonville, St. Augustine, Ponte Vedra Beach</p>
              </div>
              <div className="contact-item">
                <h3>Emergency Service</h3>
                <p>Available 24/7</p>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a message</h3>
              <form name="contact-form" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact-form" />
                <div style={{display: 'none'}}>
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>
                
                <div className="form-group">
                  <input type="text" name="firstName" placeholder="First Name" required />
                  <input type="text" name="lastName" placeholder="Last Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email" required />
                  <input type="tel" name="phone" placeholder="Phone" required />
                </div>
                <input type="text" name="subject" placeholder="Subject" required />
                <textarea name="message" placeholder="Message" required></textarea>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="quote">
        <div className="container">
          <div className="section-header">
            <h2>Get Your Free Quote</h2>
            <p>Tell us about your vessel and we'll provide a detailed estimate</p>
          </div>
          <div className="quote-form">
            <form name="quote-request" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="quote-request" />
              <div style={{display: 'none'}}>
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="firstName" placeholder="First Name" required />
                </div>
                <div className="form-group">
                  <input type="text" name="lastName" placeholder="Last Name" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Phone" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="vesselType" placeholder="Vessel Type" required />
                </div>
                <div className="form-group">
                  <input type="text" name="vesselLength" placeholder="Vessel Length" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="serviceType" placeholder="Service Type" required />
                </div>
                <div className="form-group">
                  <input type="text" name="location" placeholder="Location" />
                </div>
              </div>
              
              <div className="form-group">
                <input type="text" name="urgency" placeholder="Urgency" />
              </div>
              
              <div className="form-group">
                <textarea name="message" placeholder="Additional Message"></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Get Free Quote</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>DeepHull Diving</h3>
              <p>Professional underwater maintenance services in Northeast Florida.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Hull Cleaning</li>
                <li>Prop Polishing</li>
                <li>Zinc Replacement</li>
                <li>Emergency Service</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Phone: (904) 570-0910</p>
              <p>24/7 Emergency Service</p>
            </div>
            <div className="footer-section">
              <h4>Service Areas</h4>
              <p>Jacksonville, St. Augustine, Ponte Vedra Beach</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 DeepHull Diving. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

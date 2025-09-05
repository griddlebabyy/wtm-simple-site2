import { useState } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

const About = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className="about-page">
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo">
            <img src="/images/wtm_red_tspnt.PNG" alt="WTM Bama" className="logo-img" />
          </a>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className="desktop-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <a href="https://www.wtmshop.com" target="_blank" rel="noopener noreferrer">Shop</a>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-block">
          <Link 
            to="/" 
            className="mobile-menu-button"
            onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="mobile-menu-button"
            onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
          >
            About
          </Link>
          <a 
            href="https://www.wtmshop.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-menu-button"
            onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
          >
            Shop
          </a>
        </div>
      )}

      <main className="main">
        <div className="container">
          <div className="about-content">
            <h1>About What's The Move?</h1>
            
            <h2>Who We Are</h2>
            <p>
              What's The Move? is your go-to resource for discovering the best bars and deals in Tuscaloosa. 
              We're passionate about connecting students and locals with the vibrant nightlife scene that makes our city special.
            </p>

            <h2>What We Do</h2>
            <p>
              We curate and organize daily deals, special events, and bar information across three main areas of Tuscaloosa:
            </p>
            <ul className="location-list">
              <li><strong>The Strip</strong> - The heart of student nightlife</li>
              <li><strong>Downtown</strong> - A mix of local favorites and trendy spots</li>
              <li><strong>Niche</strong> - Hidden gems and unique venues</li>
            </ul>

            <h2>Our Mission</h2>
            <p>
              To make it easy for everyone to find their perfect spot for any day of the week. Whether you're looking for 
              the best happy hour deals, planning a night out with friends, or discovering new places, WTM Bama has you covered.
            </p>

            <h2>Get In Touch</h2>
            <div className="contact-links">
              <a 
                href="https://instagram.com/wtmbama" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link instagram"
              >
                <span className="contact-icon">📷</span>
                @wtmbama
              </a>
              <a 
                href="mailto:info@wtmbama.com"
                className="contact-link email"
              >
                <span className="contact-icon">✉️</span>
                info@wtmbama.com
              </a>
            </div>

            <h2>Stay Updated</h2>
            <p>
              Follow us on Instagram for the latest deals, special events, and bar updates. We're constantly adding new 
              venues and keeping our information fresh so you always know What's The Move in Tuscaloosa.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default About

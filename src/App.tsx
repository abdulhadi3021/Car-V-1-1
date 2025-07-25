import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/6a728901-712a-4c2c-b1ac-0be10f940374.jpg" alt="MCP Logo" className="logo-image" />
          </div>
          <div className="nav-links">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Auto Parts</a>
            <a href="#" className="nav-link">Cars for Sale</a>
          </div>
          <div className="nav-search">
            <div className="search-container">
              <div className="search-icon">🔍</div>
              <input 
                type="text" 
                placeholder="Search cars, parts, or events..." 
                className="search-input"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">WELCOME TO MCP</h1>
            <p className="hero-subtitle">Join the growing community of car enthusiasts across Pakistan.</p>
            <div className="hero-buttons">
              <button className="btn-primary">REGISTER FOR AUTO SHOW</button>
              <button className="btn-secondary">EXPLORE AUTO PARTS</button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Panel */}
      <section className="quick-links">
        <div className="quick-links-container">
          <div className="quick-link-item">
            <div className="quick-link-icon">🔧</div>
            <h3 className="quick-link-title">AUTO PARTS</h3>
          </div>
          <div className="quick-link-item">
            <div className="quick-link-icon">🚗</div>
            <h3 className="quick-link-title">CARS FOR SALE</h3>
          </div>
          <div className="quick-link-item">
            <div className="quick-link-icon">🎪</div>
            <h3 className="quick-link-title">AUTO SHOWS</h3>
          </div>
          <div className="quick-link-item">
            <div className="quick-link-icon">🏗️</div>
            <h3 className="quick-link-title">CAR BUILDS</h3>
          </div>
          <div className="quick-link-item">
            <div className="quick-link-icon">📷</div>
            <h3 className="quick-link-title">GALLERY</h3>
          </div>
          <div className="quick-link-item">
            <div className="quick-link-icon">📋</div>
            <h3 className="quick-link-title">REGISTRATION</h3>
          </div>
        </div>
      </section>

      {/* Popular Auto Parts */}
      <section className="auto-parts">
        <div className="container">
          <h2 className="section-title">POPULAR AUTO PARTS</h2>
          <div className="parts-grid">
            <div className="part-item">
              <img src="/edab2d56-6412-476d-b7da-32571e768eaa.jpg" alt="Engine" />
              <div className="part-overlay">
                <h3 className="part-title">Engine</h3>
              </div>
            </div>
            <div className="part-item">
              <img src="/2ddf52ff-6f40-465b-acc1-ea501fd7f99a.jpg" alt="Body" />
              <div className="part-overlay">
                <h3 className="part-title">Body</h3>
              </div>
            </div>
            <div className="part-item">
              <img src="/75e3e99d-4291-4795-bec4-ff476ccd8098.jpg" alt="Wheels" />
              <div className="part-overlay">
                <h3 className="part-title">Wheels</h3>
              </div>
            </div>
            <div className="part-item">
              <img src="/c6d9a2ac-2f94-4a84-9789-95fbedd50e60.jpg" alt="Electronics" />
              <div className="part-overlay">
                <h3 className="part-title">Electronics</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Auto Shows */}
      <section className="auto-shows">
        <div className="container">
          <h2 className="section-title">UPCOMING AUTO SHOWS</h2>
          <div className="shows-grid">
            <div className="show-item">
              <div className="show-date">
                <span className="month">JUN</span>
                <span className="day">10</span>
              </div>
              <div className="show-info">
                <h3 className="show-city">Lahore</h3>
                <button className="register-btn">REGISTER NOW</button>
              </div>
            </div>
            <div className="show-item">
              <div className="show-date">
                <span className="month">JUL</span>
                <span className="day">05</span>
              </div>
              <div className="show-info">
                <h3 className="show-city">Karachi</h3>
                <button className="register-btn">REGISTER NOW</button>
              </div>
            </div>
            <div className="show-item">
              <div className="show-date">
                <span className="month">AUG</span>
                <span className="day">20</span>
              </div>
              <div className="show-info">
                <h3 className="show-city">Islamabad</h3>
                <button className="register-btn">REGISTER NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enthusiast Highlights */}
      <section className="highlights">
        <div className="container">
          <h2 className="section-title">ENTHUSIAST HIGHLIGHTS</h2>
          <div className="highlights-grid">
            <div className="highlight-item">
              <img src="https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2" alt="Sports Car 1" />
            </div>
            <div className="highlight-item">
              <img src="https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2" alt="Sports Car 2" />
            </div>
            <div className="highlight-item">
              <img src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2" alt="Sports Car 3" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
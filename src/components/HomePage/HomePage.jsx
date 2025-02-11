import React from 'react';
import './HomePage.css';
import Hero from '../Hero/Hero';
import logo from '../../assets/beautybasket.png'
import Cognizant from '../../assets/Cognizant-Logo.png'
import Garnier from '../../assets/Garnier-logo.png'
import Loreal from '../../assets/LOreal-Logo.png'
import Beardo from '../../assets/Beardo.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
          <ul>
          <li><Link to="/" className="link">Home</Link></li>
          <li><Link to="/about" className="link">About</Link></li>
          <li><Link to="/login" className="link">Login</Link></li>
          <li><Link to="/register" className="link">Register</Link></li>
          </ul>
        </nav>
        <div className="marquee-container">
        <div className="marquee">
          <p>Special Offer: Get 20% off on all products! Limited time only. Free Shipping on orders above Rs.2000. Happy Shopping !!!</p>
        </div>
        </div>
      </header>
      <main className="main-content">
      <Hero />
      <hr></hr>
      <h2>Start with your favourite brand.</h2>
      <div className="marquee-container">
      <div className='marquee-two'>
      <img src={Cognizant} alt="Image 1" />
      <img src={Garnier} alt="Image 2" />
      <img src={Loreal}alt="Image 3" />
      <img src={Beardo} alt="Image 1" />
      </div>
      </div>
      
      <div className="social-media-links">
      <h2>Please feel free to reach us out!</h2>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
          <FontAwesomeIcon icon={faInstagram} fade />
        </a>
        <a href="mailto:2375276@cognizant.com" target="_blank" rel="noopener noreferrer" className="social-link">
          <FontAwesomeIcon icon={faEnvelope} fade/>
        </a>
      </div>
      </main>
      
      <footer className="footer">
        <p>© 2025 BEAUTY BASKET All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

import React from 'react'
import logo from '../../assets/beautybasket.png'
import { Link } from 'react-router-dom'
import './About.css'
import Rocket from '../../assets/rocket.png'
import Vision from '../../assets/binocular.png'
import Human from '../../assets/Review.png'
const About = () => {
  return (
      <div className="about">
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
          <p>Glow up your skin with the power of natural product</p>
        </div>
        </div>
       </header>

       <main>
        <div className="container">
          <img src={Rocket} alt="First Description" className="about-image" />
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide natural products that enhance your skin
              and promote a healthier lifestyle. We believe in the power of
              nature to nurture and rejuvenate your skin.
            </p>
          </div>
         </div>
          <div className="container-2">
          <img src={Vision} alt="Second Description" className="about-image" />
          <div className="about-text">
            <h2>Our Vision</h2>
            <p>
              Our vision is to be a leading provider of natural skincare
              products that are effective, affordable, and accessible to
              everyone. We aim to inspire confidence and promote wellness
              through our products.
            </p>
          </div>
        </div>
        <div className="container">
          <img src={Human} alt="First Description" className="about-image" />
          <div className="about-text">
            <h2>See how our customers rate us!</h2>
            <div class="rating">
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
           <span class="star">&#9733;</span>
           <span class="star">&#9734;</span> 
            </div>

          </div>
         </div>
      </main>
      <footer className="footer">
        <p>© 2025 BEAUTY BASKET All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default About

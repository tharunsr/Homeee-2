import React from 'react';
import './Hero.css';
import LadyImage from '../../assets/Skincare-bro.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-text">
            <h3>Bring <span className='brand-word c1'>Brand</span> in your life</h3>
                <p>The Destination where you can discover amazing products. Explore, buy, and shop with us!</p>
                <a href='/login' className="arrow-right">
                <FontAwesomeIcon icon={faArrowRight} shake/>
                        </a>
            </div>
            <div className="hero-illustration">
                <img src={LadyImage} alt="Illustration" />
            </div>
        </div>
    );
};

export default Hero;

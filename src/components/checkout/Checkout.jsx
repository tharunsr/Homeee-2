import React from 'react'
import logo from '../../assets/Checkout.png'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => { 
 
    const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
                <img src={logo} style={{ width:"300px" , height: "auto"}}/>
                <h1 className="title">Thanks! Your Order is on your way!</h1>
                <p className="message">Your order will be delievered within 4 to 5 working days</p>
                <button
                    onClick={() => navigate('/user-dashboard')}
                    className="button"
                >
                    Back to Products
                </button>
            </div>
  )
}

export default Checkout

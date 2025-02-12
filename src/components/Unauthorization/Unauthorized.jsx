import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css"; // Import the CSS file
import logo from '../../assets/beautybasket.png'
const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <div className="unauthorized-container">
            <img src={logo} />
            <h1 className="title">403 - Unauthorized</h1>
            <p className="message">You do not have permission to view this page.</p>
            <button
                onClick={() => navigate("/")}
                className="button"
            >
                Go to Home
            </button>
        </div>
    );
};

export default Unauthorized;
import React, { useState } from 'react';
import '../AuthPage.css';
import { login } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
useNavigate


const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(credentials);
        // Redirect after login
    } 
    catch (err) {
      setError("Invalid credentials");
  }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <a href="/register" className="link">Don't have an account? Register</a>
      </div>
    </div>
  );
};

export default Login;

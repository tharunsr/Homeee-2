import React from "react";
import { useState } from "react";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Make sure to import your CSS file

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", role: "USER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(user);
      console.log("Registered:", response.data); // Debugging
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="animated-background">
      <div className="login-container">
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {/* <select name="role" onChange={handleChange} required>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select> */}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import { useState } from "react";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Make sure to import your CSS file
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", address:"",phone_num:"", role: "USER" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(user.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(user.password)) {
      setError("Password must be at least 8 characters long and include at least one number.");
      return;
    }

    try {
      const response = await register(user);
      console.log("Registered:", response.data);
      toast.success("Registration Successful") // Debugging
      navigate("/login");
    } catch (err) {
      toast.error("Registration Failed")
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
         <div style={{ display: "flex", alignItems: "center" , justifyContent : "space-between"}}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={{ marginRight: "10px" }}
            />
            <button type="button" className="toggle-password-button" onClick={toggleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <select name="role" onChange={handleChange} required>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <input
            type="tel"
            name="phone_num"
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

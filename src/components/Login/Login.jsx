import React from "react";
import { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import "../Register/Register.css"; // Make sure to import your CSS file
import { toast } from "react-toastify";
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
      const response = await login(credentials);
      console.log("Login Response:", response); // Debugging
      toast.success("Login Successful")
      if (response.token) {
        const tokenParts = JSON.parse(atob(response.token.split(".")[1]));
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", tokenParts.role);
        console.log("Role Stored:", tokenParts.role);
        console.log("Payload:", tokenParts);
        // Debugging

        if (tokenParts.role === "ROLE_ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login Failed");
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="animated-background">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <a href="/register">Don't have an account? Sign up!</a>
        </form>
      </div>
    </div>
  );
};

export default Login;

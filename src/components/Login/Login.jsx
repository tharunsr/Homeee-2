import { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

 
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
            console.log("Login Response:", response);  // Debugging
 
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
            setError("Invalid email or password.");
        }
    };
 
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
 
export default Login;
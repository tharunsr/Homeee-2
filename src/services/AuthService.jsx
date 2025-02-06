import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth";  

// Register User
export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

// Login User
export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        const userRole = parseJwt(response.data.token).role;
        localStorage.setItem("role", userRole);
    } else{
        console.error("Authentication failed");
    }
    return response.data;
};

// Logout User
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role")
};

// Get Current User
export const getCurrentUserRole = () => {
    return localStorage.getItem("role");
};

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    } catch (e) {
        return null;
    }
}

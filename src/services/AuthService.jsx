import axios from "axios";
 
const API_URL = "http://localhost:8080/api/auth";
 
// Register User
export const register = async (userData) => {
return axios.post(`${API_URL}/register`, userData);
};
 
// Login User
export const login = async (credentials) => {
const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
 
// Logout User
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};
 
// Get Current User Role
export const getCurrentUserRole = () => {
    return localStorage.getItem("role");
}
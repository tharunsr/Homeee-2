import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Replace with your API base URL
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage (or wherever it's stored)
        const token = localStorage.getItem('token'); // Adjust based on your storage mechanism

        // Attach the token to the Authorization header if it exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle response errors globally
        if (error.response) {
            console.error('Error Response:', error.response.data);
            // Optionally, handle specific status codes (e.g., 401 Unauthorized)
            if (error.response.status === 401) {
                console.warn('Unauthorized: Token might be invalid or expired.');
                // Redirect to login page or refresh token
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
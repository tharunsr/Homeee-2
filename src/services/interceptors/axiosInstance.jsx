import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', 
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage 
        const token = localStorage.getItem('token'); 

        // Attach the token to the Authorization header
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
       
        if (error.response) {
            console.error('Error Response:', error.response.data);

            if (error.response.status === 401) {
                console.warn('Unauthorized: Token might be invalid or expired.');
                // Redirect to login page or refresh token
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
import axiosInstance from './interceptors/axiosInstance'; // Import the custom Axios instance

const API_URL = '/products';
const ADMIN_URL = '/admin/products';

// Fetch all products (Public)
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetch a product by ID (Public)
export const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
};

// Add a new product (Admin Only)
export const addProduct = async (productData) => {
    try {
        const response = await axiosInstance.post(ADMIN_URL, productData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Update an existing product (Admin Only)
export const updateProduct = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`${ADMIN_URL}/${id}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};

// Delete a product (Admin Only)
export const deleteProduct = async (id) => {
    try {
        await axiosInstance.delete(`${ADMIN_URL}/${id}`);
        return { message: 'Product deleted successfully' };
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
    }
};
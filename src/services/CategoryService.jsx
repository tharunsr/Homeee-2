import axiosInstance from './interceptors/axiosInstance'; // Import the custom Axios instance

const API_URL = '/categories'; // Base URL for categories
const ADMIN_URL = '/admin/categories'; // Admin-specific URL for categories

// Fetch all categories (Public)
export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fetch a category by ID (Public)
export const getCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw error;
    }
};

// Add a new category (Admin Only)
export const addCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post(ADMIN_URL, categoryData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

// Update an existing category (Admin Only)
export const updateCategory = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`${ADMIN_URL}/${id}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating category with ID ${id}:`, error);
        throw error;
    }
};

// Delete a category (Admin Only)
export const deleteCategory = async (id) => {
    try {
        await axiosInstance.delete(`${ADMIN_URL}/${id}`);
        return { message: 'Category deleted successfully' };
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw error;
    }
};
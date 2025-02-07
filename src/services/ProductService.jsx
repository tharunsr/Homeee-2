import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

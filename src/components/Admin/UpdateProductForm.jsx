// UpdateProductForm.js
import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../../services/ProductService';
import { toast } from 'react-toastify';


const UpdateProductForm = ({ productId, categories, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '',
    });

    // Fetch the product details when the component loads
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const product = await getProductById(productId);
                setFormData({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    categoryId: product.categoryId || '',
                 
                });
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(productId, formData);
            toast.success('Product updated successfully');
            onUpdateSuccess(); // Notify the parent component to refresh the product list
        } catch (error) {
            toast.error('Failed to update product:');
        }
    };

    return (
        <div className="add-product-form">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProductForm;
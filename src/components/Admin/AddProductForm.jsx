// AddProductForm.js
import React, { useState } from 'react';
import { addProduct } from '../../services/ProductService';
import { toast } from 'react-toastify';

const AddProductForm = ({ categories, onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(formData);
            toast.success('Product added successfully');
            onProductAdded(); // Notify the parent component to refresh the product list
            setFormData({ name: '', price: '', description: '', categoryId: '' }); // Reset form
        } catch (error) {
            toast.error('Failed to add product:', error);
        }
    };

    return (
        <div className="add-product-form">
            <h2>Add New Product</h2>
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
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;
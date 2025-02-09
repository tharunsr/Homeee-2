import React, { useEffect, useState } from 'react';
import {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from '../../services/CategoryService';
import './CategoryComponent.css'; // Import the CSS file

const CategoryComponent = () => {
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // State to toggle Add Category Form
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State to track the category being updated
    const [newCategoryName, setNewCategoryName] = useState(''); // State for new category name
    const [updatedCategoryName, setUpdatedCategoryName] = useState(''); // State for updated category name

    // Fetch all categories on component load
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    // Add a new category
    const handleAddCategory = async () => {
        try {
            const response = await addCategory({ name: newCategoryName });
            alert('Category added successfully');
            fetchCategories(); // Refresh the category list
            setNewCategoryName(''); // Clear the input field
            setShowAddForm(false); // Close the form
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    // Update an existing category
    const handleUpdateCategory = async () => {
        try {
            const response = await updateCategory(selectedCategoryId, { name: updatedCategoryName });
            alert('Category updated successfully');
            fetchCategories(); // Refresh the category list
            setSelectedCategoryId(null); // Close the update form
            setUpdatedCategoryName(''); // Clear the input field
        } catch (error) {
            console.error('Failed to update category:', error);
        }
    };

    // Delete a category
    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            alert('Category deleted successfully');
            fetchCategories(); // Refresh the category list
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    return (
        <div className="category-component">
            <h2>Category Management</h2>

            {/* Button to Open Add Category Form */}
            <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Hide Add Category Form' : 'Show Add Category Form'}
            </button>

            {/* Add Category Form */}
            {showAddForm && (
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
            )}

            {/* Category List */}
            <div className="category-list">
                <h3>Categories</h3>
                {categories.map((category) => (
                    <div key={category.id} className="category-item">
                        <span>{category.name}</span>
                        <div className="actions">
                            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                            <button
                                onClick={() => {
                                    setSelectedCategoryId(category.id);
                                    setUpdatedCategoryName(category.name);
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Category Form */}
            {selectedCategoryId && (
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Enter updated category name"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                    />
                    <button onClick={handleUpdateCategory}>Update Category</button>
                </div>
            )}
        </div>
    );
};

export default CategoryComponent;
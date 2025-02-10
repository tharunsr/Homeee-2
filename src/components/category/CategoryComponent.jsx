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
    const [showAddModal, setShowAddModal] = useState(false); // State to toggle Add Category Modal
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
            await addCategory({ name: newCategoryName });
            alert('Category added successfully');
            fetchCategories(); // Refresh the category list
            setNewCategoryName(''); // Clear the input field
            setShowAddModal(false); // Close the modal
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    // Update an existing category
    const handleUpdateCategory = async () => {
        try {
            await updateCategory(selectedCategoryId, { name: updatedCategoryName });
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
        <div className="cc-dashboard">
            <h2>Category Management</h2>

            {/* Button to Open Add Category Modal */}
            <button className="cc-add-btn" onClick={() => setShowAddModal(true)}>
                Add New Category
            </button>

            {/* Add Category Modal */}
            {showAddModal && (
                <div className="cc-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="cc-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setShowAddModal(false)}>
                            X
                        </button>
                        <h3>Add New Category</h3>
                        <input
                            type="text"
                            placeholder="Enter category name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button className="cc-modal-action-btn" onClick={handleAddCategory}>
                            Add Category
                        </button>
                    </div>
                </div>
            )}

            {/* Category List */}
            <div className="cc-card-container">
                {categories.map((category) => (
                    <div key={category.id} className="cc-card">
                        <span className="cc-category-name">{category.name}</span>
                        <div className="cc-card-actions">
                            <button
                                className="cc-delete-btn"
                                onClick={() => handleDeleteCategory(category.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="cc-update-btn"
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
                <div className="cc-update-form-container">
                    <h3>Update Category</h3>
                    <input
                        type="text"
                        placeholder="Enter updated category name"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                    />
                    <button className="cc-update-action-btn" onClick={handleUpdateCategory}>
                        Update Category
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoryComponent;
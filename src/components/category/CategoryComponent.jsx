import React, { useEffect, useState } from 'react';
import {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from '../../services/CategoryService';
import './CategoryComponent.css'; // Import the CSS file
import { toast } from 'react-toastify';
import logo from '../../assets/beautybasket.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

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
            toast.success('Category added successfully');
            fetchCategories(); // Refresh the category list
            setNewCategoryName(''); // Clear the input field
            setShowAddModal(false); // Close the modal
        } catch (error) {
            toast.error('Failed to add category')
            console.error('Failed to add category:', error);
        }
    };

    // Update an existing category
    const handleUpdateCategory = async () => {
        try {
            await updateCategory(selectedCategoryId, { name: updatedCategoryName });
            toast.success('Category updated successfully');
            fetchCategories(); // Refresh the category list
            setSelectedCategoryId(null); // Close the update form
            setUpdatedCategoryName(''); // Clear the input field
        } catch (error) {
            toast.error('Failed to update category:', error);
        }
    };

    // Delete a category
    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            toast.success('Category deleted successfully');
            fetchCategories(); // Refresh the category list
        } catch (error) {
            toast.error('Failed to delete category:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-navbar">
                <img src={logo} alt="Logo" className="dashboard-logo" />
                    <ul>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/admin-dashboard">Products</Link>
                        </li>
                        <li>
                        <Link to="/">
                        <FontAwesomeIcon icon={faPowerOff} style={{color: "#ffffff"}} />
                        </Link>
                        </li>
                        
                    </ul>
                </nav>
            <h1 className="dashboard-title">Category Management</h1>

            {/* Button to Open Add Category Modal */}
            <button className="cc-add-btn" onClick={() => setShowAddModal(true)}>
                Add New Category
            </button>

          
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
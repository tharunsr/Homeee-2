import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/CategoryService';
import './CategoryListComponent.css'; // Import the CSS file

const CategoryListComponent = () => {
    const [categories, setCategories] = useState([]);

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

    return (
        <div className="category-list-component">
            <h2>Available Categories</h2>

            {/* Category List */}
            <div className="category-list">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id} className="category-item">
                            <span>{category.name}</span>
                        </div>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryListComponent;
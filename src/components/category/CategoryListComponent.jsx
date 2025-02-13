import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/CategoryService';
import './CategoryListComponent.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/beautybasket.png'
import { faCartShopping, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../services/AuthService';

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
        <div className="dashboard-container">
        <nav className="dashboard-navbar">
                        <img src={logo} alt="Logo" className="dashboard-logo" />
                            <ul>
                                <li>
                                <Link to="/">Home</Link>
                                </li>
                                <li>
                                <Link to="/user-dashboard">Products</Link>
                                </li>
                                <li>
                                    <Link to="/cart">
                                    <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} />
                                    </Link>
                                </li>
                                <li>
                                <button onClick={logout} style={{cursor : "pointer"}} >
                                <FontAwesomeIcon icon={faPowerOff} />
                                </button>
                                </li>
                               
                            </ul>
                        </nav>   
            <h2 className="dashboard-title">Available Categories</h2>
            {/* Category List */}
            <div className="cc-card-container">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id} className="category-card">
                            <span>{category.name}</span>
                        </div>
                    ))
                ) : (
                    <p className="dashboard-title">No categories available.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryListComponent;
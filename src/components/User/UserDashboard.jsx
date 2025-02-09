import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductById } from '../../services/ProductService';
import './UserDashboard.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product for the modal
    const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
    const userId = localStorage.getItem("userId");
    console.log(userId);
    // Fetch all products on component load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Handle product selection and fetch product details
    const handleProductClick = async (id) => {
        try {
            const product = await getProductById(id);
            setSelectedProduct(product);
            console.log(product);
            setShowModal(true); // Open the modal
        } catch (error) {
            console.error('Failed to fetch product details:', error);
        }
    };

    // Add to cart functionality (example)
    const addToCart = (product) => {
        console.log('Adding to cart:', product);
        // Implement your cart logic here (e.g., update state or call an API)
    };

    return (
        
        <div className="user-dashboard-container">
            {/* Navbar */}
            <nav className="user-navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user-dashboard/categories">Categories</Link>
                    </li>
                    {/* Add more links here if needed */}
                </ul>
            </nav>

            <h1 className="user-dashboard-title">Welcome to Beauty Basket</h1>
            

            {/* Product List (Grid Layout) */}
            <div className="user-dashboard-grid">
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="user-dashboard-product-box"
                    >
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent click event
                                addToCart(product);
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Product Details Modal */}
            {showModal && selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowModal(false)} // Close the modal
                        >
                            X
                        </button>
                        <h2>Product Details</h2>
                        <p><strong>Name:</strong> {selectedProduct.name}</p>
                        <p><strong>Price:</strong> ${selectedProduct.price}</p>
                        <p><strong>Description:</strong> {selectedProduct.description}</p>
                        <p><strong>Category:</strong> {selectedProduct.categoryName || 'N/A'}</p>
                        {/* Add more product details here if available */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
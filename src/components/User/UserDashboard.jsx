import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductById } from '../../services/ProductService';
import './UserDashboard.css'; // Import the CSS file

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    // Handle product selection
    const handleProductClick = async (id) => {
        try {
            const product = await getProductById(id);
            setSelectedProduct(product);
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
            <h1 className="user-dashboard-title">User Dashboard</h1>

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
                        <button onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent click event
                            addToCart(product);
                        }}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Product Details */}
            {selectedProduct && (
                <div className="user-dashboard-product-details">
                    <h2>Product Details</h2>
                    <p>Name: {selectedProduct.name}</p>
                    <p>Price: ${selectedProduct.price}</p>
                    <button
                        className="user-dashboard-add-to-cart-button"
                        onClick={() => addToCart(selectedProduct)}
                    >
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
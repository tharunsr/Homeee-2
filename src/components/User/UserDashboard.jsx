import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductById } from '../../services/ProductService';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import { logout } from '../../services/AuthService'; // Adjust the path as needed
const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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
            setShowModal(true);
        } catch (error) {
            console.error('Failed to fetch product details:', error);
        }
    };

    // Add product to cart and navigate to Cart page
    const addToCart = (product) => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cartItems.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Redirect to Cart page
        navigate('/cart');
    };

    return (
        <div className="user-dashboard-container">
            <nav className="user-navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/user-dashboard/categories">Categories</Link></li>
                    <li><Link to="/cart">Cart</Link></li> {/* Added Cart Link */}
                    <li>
            <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
            </button>
        </li>
                </ul>
            </nav>
            <h1 className="user-dashboard-title">Welcome to Beauty Basket</h1>

            <div className="user-dashboard-grid">
                {products.map((product) => (
                    <div key={product.id} className="user-dashboard-product-box" onClick={() => handleProductClick(product.id)}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {showModal && selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={() => setShowModal(false)}>X</button>
                        <h2>Product Details</h2>
                        <p><strong>Name:</strong> {selectedProduct.name}</p>
                        <p><strong>Price:</strong> ${selectedProduct.price}</p>
                        <p><strong>Description:</strong> {selectedProduct.description}</p>
                        <p><strong>Category:</strong> {selectedProduct.categoryName || 'N/A'}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;

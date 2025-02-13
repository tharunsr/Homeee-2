import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductById } from '../../services/ProductService';
import { Link, useNavigate } from 'react-router-dom';
import '../Dashboard/Dashboard.css'
import { logout } from '../../services/AuthService'; // Adjust the path as needed
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/beautybasket.png'


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
                setProducts(data)
                if (data.length === 0) {
                    toast.error('No Products Available');
                }
            } catch (error) {
                toast.error('Failed to fetch products, Check Backend', error);
                navigate('/');
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
        toast.success("Product added to Cart")
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
        
        <div className='dashboard-container'>

         <nav className="dashboard-navbar">
                        <img src={logo} alt="Logo" className="dashboard-logo" />
                            <ul>
                                <li>
                                <Link to="/">Home</Link>
                                </li>
                                <li>
                                <Link to="/user-dashboard/categories">Categories</Link>
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

            <h1 className="dashboard-title">Welcome to Beauty Basket</h1>

            <div className="products-container">
                {products.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price}</p>
                        <p>{product.description}</p>
                        <button onClick={(e) => { e.stopPropagation(); 
                            addToCart(product); }}>Add to Cart</button>
                    </div>
                ))}
            </div>
            
            {/* Modal Pop-up */}
            {showModal && selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={() => setShowModal(false)}>X</button>
                        <h2>Product Details</h2>
                        <p><strong>Name:</strong> {selectedProduct.name}</p>
                        <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                        <p><strong>Description:</strong> {selectedProduct.description}</p>
                        <p><strong>Category:</strong> {selectedProduct.categoryName || 'N/A'}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;

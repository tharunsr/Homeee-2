// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import {
    getAllProducts,
    deleteProduct,
} from '../../services/ProductService';
import { getAllCategories } from '../../services/CategoryService';
import AddProductForm from './AddProductForm'; // Import the AddProductForm component
import UpdateProductForm from './UpdateProductForm'; // Import the UpdateProductForm component
import './AdminDashboard.css'; // Import the CSS file
import { Link } from 'react-router-dom';


const AdminDashboard = ({ token }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false); // State for Add Product Modal
    const [selectedProductId, setSelectedProductId] = useState(null); // State to track the product being updated

    // Fetch all products and categories on component load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchProducts();
        fetchCategories();
    }, []);

    // Refresh the product list after adding or updating a product
    const handleProductUpdated = async () => {
        try {
            const updatedProducts = await getAllProducts();
            setProducts(updatedProducts);
            setSelectedProductId(null); // Close the update form after success
            setShowAddProductModal(false); // Close the add form after success
        } catch (error) {
            console.error('Failed to fetch updated products:', error);
        }
    };

    // Delete a product
    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id, token);
            alert('Product deleted successfully');
            const updatedProducts = await getAllProducts();
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <div className="admin-dashboard-container">
         
            <nav className="admin-navbar">
                    <ul>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/admin-dashboard/categories">Categories</Link>
                        </li>
                        {/* Add more links here if needed */}
                    </ul>
                </nav>
           
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>
            {/* Button to Open Add Product Modal */}
            <button className = "cc-add-btn"
                onClick={() => setShowAddProductModal(true)}
                style={{ marginBottom: '20px' }}
            >
                Add New Product
            </button>

            {/* Add Product Modal */}
            {showAddProductModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowAddProductModal(false)}
                        >
                            X
                        </button>
                        <AddProductForm
                            categories={categories}
                            onProductAdded={handleProductUpdated}
                        />
                    </div>
                </div>
            )}

            {/* Product List */}
            <div>
                <h2>Products</h2>
                <div className="products-container">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>{product.description}</p>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="update-btn"
                                onClick={() => setSelectedProductId(product.id)}
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Update Product Modal */}
            {selectedProductId && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-modal-btn"
                            onClick={() => setSelectedProductId(null)}
                        >
                            X
                        </button>
                        <UpdateProductForm
                            productId={selectedProductId}
                            categories={categories}
                            onUpdateSuccess={handleProductUpdated}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
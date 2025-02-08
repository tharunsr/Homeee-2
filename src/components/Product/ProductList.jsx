import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/ProductService';

const ProductList = ({ user, token }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id, token);
                setProducts(products.filter(product => product.id !== id));
            } catch (err) {
                setError('Failed to delete product.');
            }
        }
    };

    return (
        <div>
            <h2>Product List</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && products.length === 0 && <p>No products available.</p>}

            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price} (Category: {product.categoryId})
                        {user?.role === "ROLE_ADMIN" && (
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;


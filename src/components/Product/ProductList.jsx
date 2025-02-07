import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/ProductService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                setError('Failed to fetch products.');
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

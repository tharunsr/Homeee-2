import React, { useEffect, useState } from 'react';
import { getProductById } from '../../services/ProductService';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to fetch product.');
                console.error('Error fetching product:', err);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div>
            <h2>Product Detail</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {product && (
                <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const updateQuantity = (id, change) => {
        let updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        let updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        navigate('/checkout'); // Redirect to a Checkout Page (to be implemented)
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeItem(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Total: ${getTotalPrice()}</h3>
                    <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                </>
            )}
            <Link to="/user-dashboard">Back to Products</Link>
        </div>
    );
};

export default Cart;

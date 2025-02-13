import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/beautybasket.png'
import { logout } from '../../services/AuthService';

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
     
        toast.warn("Product Removed Successfully")
        let updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        toast.success('Order Confirmed');
        navigate('/checkout'); // Redirect to a Checkout Page (to be implemented)
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
                                         <button onClick={logout} style={{cursor : "pointer"}} >
                                         <FontAwesomeIcon icon={faPowerOff} />
                                         </button>
                                         </li>
                                        
                                     </ul>
                                 </nav>
            
            <h2 className="dashboard-title">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="dashboard-title">Your cart is empty.</p>
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
                                    <td>₹{item.price}</td>
                                    <td>
                                        <div className='cart-quantity'>
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                    </td>
                                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <div className='cart-del-button'>
                                        <button onClick={() => removeItem(item.id)}>Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 className="dashboard-title">Total: ₹{getTotalPrice()}</h3>
                    <button className="cc-add-btn" onClick={handleCheckout}>Checkout</button>
                </>
            )}
            <div className='cart-back'>
            <Link to="/user-dashboard" >
            Back to Products</Link>
            </div>
            
        </div>
    );
};

export default Cart;

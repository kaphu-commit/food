import React, { useState } from 'react';
import { firestore, auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const user = auth.currentUser;
    if (user) {
      try {
        const cartSnapshot = await firestore.collection('carts').doc(user.uid).get();
        const cartItems = cartSnapshot.data().items || [];
        const order = {
          userId: user.uid,
          email: user.email, // Add user's email
          deliveryAddress: address,
          paymentMethod,
          products: cartItems,
          status: 'Pending'
        };

        // Add order to 'orders' collection
        await firestore.collection('orders').add(order);

        // Clear the cart
        await firestore.collection('carts').doc(user.uid).update({ items: [] });

        setSuccess('Order placed successfully!');
      } catch (error) {
        setError('An error occurred while placing the order.');
      }
    } else {
      setError('User not authenticated.');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Delivery Address:</label>
          <input
            id="address"
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
          <select
            id="paymentMethod"
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success mt-3" role="alert">
            {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default Checkout;

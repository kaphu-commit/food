import React, { useState, useEffect } from 'react';
import { firestore, auth, doc, collection, addDoc, runTransaction ,getDoc} from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const user = auth.currentUser;
      if (user) {
        setIsAuthenticated(true);
        const state = location.state;
        if (state && state.cartItems) {
          setCartItems(state.cartItems);
        } else {
          fetchCartItems(user);
        }
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    checkAuthentication();

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  const fetchCartItems = async (user) => {
    const cartRef = doc(firestore, 'carts', user.uid);
    const cartSnapshot = await getDoc(cartRef);
    if (cartSnapshot.exists()) {
      setCartItems(cartSnapshot.data().items || []);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setError('You must be logged in to place an order.');
      return;
    }

    if (!address) {
      setError('Please enter your delivery address.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const user = auth.currentUser;
    if (user) {
      try {
        const order = {
          userId: user.uid,
          email: user.email,
          deliveryAddress: address,
          paymentMethod,
          products: cartItems,
          status: 'Pending',
          createdAt: new Date(),
        };

        await runTransaction(firestore, async (transaction) => {
          const cartDoc = doc(firestore, 'carts', user.uid);
          const cartSnapshot = await transaction.get(cartDoc);
          if (!cartSnapshot.exists() || cartItems.length === 0) {
            throw new Error('Your cart is empty!');
          }
          // Use Firestore's auto-generated ID for the order
          await addDoc(collection(firestore, 'orders'), order);
          await transaction.update(cartDoc, { items: [] });
        });

        setSuccess('Order placed successfully!');
      } catch (error) {
        console.error('Error placing order:', error);
        setError('An error occurred while placing the order.');
      }
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
          disabled={loading || !isAuthenticated || !address}
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

import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { doc, getDoc, updateDoc, arrayRemove, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const cartRef = doc(firestore, 'carts', user.uid);
          const cartSnapshot = await getDoc(cartRef);
          if (cartSnapshot.exists()) {
            setCartItems(cartSnapshot.data().items || []);
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = async (item, change) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const cartRef = doc(firestore, 'carts', user.uid);
        let updatedItems;

        if (change > 0) {
          // Increase quantity
          updatedItems = cartItems.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + change }
              : cartItem
          );
        } else {
          // Decrease quantity
          updatedItems = cartItems.reduce((acc, cartItem) => {
            if (cartItem.id === item.id) {
              if (cartItem.quantity + change <= 0) {
                return acc; // Skip adding this item to the updatedItems array
              }
              acc.push({ ...cartItem, quantity: cartItem.quantity + change });
            } else {
              acc.push(cartItem);
            }
            return acc;
          }, []);
        }

        await updateDoc(cartRef, { items: updatedItems });
        setCartItems(updatedItems);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  const handleDelete = async (item) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const cartRef = doc(firestore, 'carts', user.uid);
        const updatedItems = cartItems.filter(cartItem => cartItem.id !== item.id);

        await updateDoc(cartRef, { items: updatedItems });
        setCartItems(updatedItems);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleBuyNow = async (item) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const order = {
          userId: user.uid,
          deliveryAddress: '', // Address to be set in checkout
          paymentMethod: 'credit_card', // Default or set in checkout
          products: [item],
          status: 'Pending'
        };

        await addDoc(collection(firestore, 'orders'), order);

        const cartRef = doc(firestore, 'carts', user.uid);
        await updateDoc(cartRef, { items: arrayRemove(item) });

        // Pass the item and cart information to the Checkout page
        navigate('/checkout', { state: { item, cartItems } });
      } catch (error) {
        console.error('Error handling buy now:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length > 0 ? (
        <>
          <div className="list-group">
            {cartItems.map((item, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-outline-secondary me-2" 
                      onClick={() => handleQuantityChange(item, -1)}
                    >
                      -
                    </button>
                    <span className="me-2">Quantity: {item.quantity}</span>
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => handleQuantityChange(item, 1)}
                    >
                      +
                    </button>
                    <button 
                      className="btn btn-danger ms-2" 
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary rounded-pill me-3">
                    ${ (item.price * item.quantity).toFixed(2) }
                  </span>
                  <button 
                    className="btn btn-success" 
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 d-flex justify-content-between">
            <h4>Total:</h4>
            <h4>${calculateTotal()}</h4>
          </div>
        </>
      ) : (
        <div className="alert alert-info" role="alert">
          Your cart is empty.
        </div>
      )}
    </div>
  );
};

export default Cart;

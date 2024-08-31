import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await firestore.collection('carts').doc(user.uid).get();
        if (snapshot.exists) {
          setCartItems(snapshot.data().items || []);
        }
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <div className="list-group">
            {cartItems.map((item, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                  <small>Quantity: {item.quantity}</small>
                </div>
                <span className="badge bg-primary rounded-pill">
                  ${ (item.price * item.quantity).toFixed(2) }
                </span>
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

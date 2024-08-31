import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';

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

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

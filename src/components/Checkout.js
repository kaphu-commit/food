import React, { useState } from 'react';
import { firestore, auth } from '../firebase';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (user) {
      const cartSnapshot = await firestore.collection('carts').doc(user.uid).get();
      const cartItems = cartSnapshot.data().items || [];
      const order = {
        userId: user.uid,
        deliveryAddress: address,
        paymentMethod,
        products: cartItems,
        status: 'Pending'
      };
      await firestore.collection('orders').add(order);
      // Clear cart
      await firestore.collection('carts').doc(user.uid).update({ items: [] });
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <label>
        Delivery Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        Payment Method:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;

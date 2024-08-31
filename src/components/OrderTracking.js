import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const doc = await firestore.collection('orders').doc(orderId).get();
      if (doc.exists) {
        setOrder(doc.data());
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Order Tracking</h2>
      <p>Order ID: {orderId}</p>
      <p>Status: {order.status}</p>
      <p>Delivery Address: {order.deliveryAddress}</p>
    </div>
  );
};

export default OrderTracking;

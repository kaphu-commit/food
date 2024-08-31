import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await firestore.collection('orders').where('userId', '==', user.uid).get();
        const ordersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order ID: {order.id}, Status: {order.status}, Total: ${order.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;

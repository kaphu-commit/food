import React, { useState, useEffect } from 'react';
import { firestore, auth, collection, query, where, getDocs } from '../firebase';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Create a reference to the orders collection
          const ordersRef = collection(firestore, 'orders');
          // Create a query to filter orders by userId
          const q = query(ordersRef, where('userId', '==', user.uid));
          // Execute the query
          const snapshot = await getDocs(q);
          // Map over the documents to create a list of orders
          const ordersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersList);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Order History</h2>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order.id} className="list-group-item">
            <h5>Order ID: {order.id}</h5>
            <p>Status: {order.status}</p>
            <p>Total: ${order.products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}</p>
            <p>Delivery Address: {order.deliveryAddress}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Email: {order.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Ensure this exports the Firestore instance
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      // Create a reference to the order document
      const orderDocRef = doc(firestore, 'orders', orderId);
      
      try {
        // Fetch the document
        const docSnap = await getDoc(orderDocRef);
        
        if (docSnap.exists()) {
          setOrder(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
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

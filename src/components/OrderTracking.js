import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderTracking = () => {
  const { orderId } = useParams(); // Get the orderId from URL
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (!orderData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Tracking</h2>
      <p>Order ID: {orderData.id}</p>
      <p>Status: {orderData.status}</p>
      {/* Render other order details */}
    </div>
  );
};

export default OrderTracking;

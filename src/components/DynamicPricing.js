import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const DynamicPricing = ({ productId }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProductPrice = async () => {
      const doc = await firestore.collection('products').doc(productId).get();
      if (doc.exists) {
        const productData = doc.data();
        const currentPrice = productData.basePrice * (1 + productData.demandFactor);
        setPrice(currentPrice);
      }
    };

    fetchProductPrice();
  }, [productId]);

  return (
    <div>
      <h2>Price: ${price.toFixed(2)}</h2>
    </div>
  );
};

export default DynamicPricing;

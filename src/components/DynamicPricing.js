import React, { useState, useEffect } from 'react';
import { firestore, doc, getDoc } from '../firebase'; // Ensure the path is correct

const DynamicPricing = ({ productId }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProductPrice = async () => {
      try {
        const productDocRef = doc(firestore, 'products', productId);
        const productDoc = await getDoc(productDocRef);

        if (productDoc.exists()) {
          const productData = productDoc.data();
          const currentPrice = productData.basePrice * (1 + productData.demandFactor);
          setPrice(currentPrice);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product price:', error);
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

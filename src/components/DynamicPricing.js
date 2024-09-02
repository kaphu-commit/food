import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DynamicPricing = () => {
  const { productId } = useParams(); // Get the productId from URL
  const [pricingData, setPricingData] = useState(null);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/pricing`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPricingData(data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };

    fetchPricingData();
  }, [productId]);

  if (!pricingData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dynamic Pricing</h2>
      <p>Product ID: {pricingData.id}</p>
      <p>Price: ${pricingData.price}</p>
      {/* Render other pricing details */}
    </div>
  );
};

export default DynamicPricing;

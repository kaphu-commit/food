import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Ensure this path is correct

const DynamicPricing = () => {
  const { productId } = useParams(); // Get the productId from URL
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(''); // To manage error state

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const docRef = doc(firestore, 'products', productId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPricingData(docSnap.data());
        } else {
          setError('No pricing data found for this product.');
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error);
        setError('Failed to load pricing data.');
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchPricingData();
  }, [productId]);

  if (loading) return <p>Loading...</p>; // Show loading message while data is being fetched

  return (
    <div>
      <h2>Dynamic Pricing</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {pricingData && (
        <>
          <p>Product ID: {pricingData.id}</p>
          <p>Price: ${pricingData.price}</p>
          {/* Render other pricing details */}
        </>
      )}
    </div>
  );
};

export default DynamicPricing;

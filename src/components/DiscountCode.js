import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const DiscountCode = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApplyCode = async () => {
    setLoading(true);
    setError('');
    setDiscount(null); // Reset discount on new code attempt

    try {
      const discountsCollection = collection(firestore, 'discounts');
      const q = query(discountsCollection, where('code', '==', code));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const discountData = snapshot.docs[0].data();
        setDiscount(discountData.amount);
      } else {
        setDiscount(0);
        setError('Invalid discount code.');
      }
    } catch (err) {
      console.error('Error applying discount code:', err);
      setError('Failed to apply discount code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter discount code"
      />
      <button onClick={handleApplyCode} disabled={loading}>
        {loading ? 'Applying...' : 'Apply'}
      </button>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      {discount !== null && (
        <p>Discount Applied: ${discount}</p>
      )}
    </div>
  );
};

export default DiscountCode;

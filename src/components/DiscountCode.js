import React, { useState } from 'react';
import { firestore } from '../firebase';

const DiscountCode = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(null);

  const handleApplyCode = async () => {
    const snapshot = await firestore.collection('discounts').where('code', '==', code).get();
    if (!snapshot.empty) {
      const discountData = snapshot.docs[0].data();
      setDiscount(discountData.amount);
    } else {
      setDiscount(0);
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
      <button onClick={handleApplyCode}>Apply</button>
      {discount && <p>Discount Applied: ${discount}</p>}
    </div>
  );
};

export default DiscountCode;

import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';

const LoyaltyRewards = () => {
  const [rewards, setRewards] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      const user = auth.currentUser;
      if (user) {
        const doc = await firestore.collection('users').doc(user.uid).get();
        if (doc.exists) {
          setRewards(doc.data().loyaltyPoints || 0);
        }
      }
    };

    fetchRewards();
  }, []);

  return (
    <div>
      <h2>Loyalty Rewards</h2>
      <p>You have {rewards} points</p>
    </div>
  );
};

export default LoyaltyRewards;

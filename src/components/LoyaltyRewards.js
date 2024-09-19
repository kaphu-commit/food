import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

const LoyaltyRewards = () => {
  const [rewards, setRewards] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      setError('');
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setRewards(userDoc.data().loyaltyPoints || 0);
          } else {
            setRewards(0); // Default to 0 if no data
          }
        } else {
          setError('User not authenticated.');
        }
      } catch (err) {
        console.error('Error fetching loyalty rewards:', err);
        setError('Failed to fetch loyalty rewards.');
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading indicator while fetching data
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>; // Show error if any

  return (
    <div>
      <h2>Loyalty Rewards</h2>
      <p>You have {rewards} points</p>
    </div>
  );
};

export default LoyaltyRewards;

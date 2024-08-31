import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';

const PersonalizedRecommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const user = auth.currentUser;
      if (user) {
        const doc = await firestore.collection('users').doc(user.uid).get();
        const userPreferences = doc.data().preferences || [];
        const snapshot = await firestore.collection('products').where('category', 'in', userPreferences).get();
        const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecommendedProducts(productsList);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended for You</h2>
      <div>
        {recommendedProducts.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;

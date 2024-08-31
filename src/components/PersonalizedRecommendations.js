import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Recommended for You</h2>
      <div className="row">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <a href={`/products/${product.id}`} className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              No recommendations available at the moment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;

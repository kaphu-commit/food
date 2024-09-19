import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const PersonalizedRecommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(''); // To handle errors

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          const userPreferences = userDoc.data()?.preferences || [];
          
          // Fetch recommended products based on user preferences
          const productsCollection = collection(firestore, 'products');
          const q = query(productsCollection, where('category', 'in', userPreferences));
          const snapshot = await getDocs(q);
          const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          setRecommendedProducts(productsList);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to load recommendations.');
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading message while data is being fetched

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Recommended for You</h2>
      <div className="row">
        {error && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}
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

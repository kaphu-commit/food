import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const productsCollection = collection(firestore, 'products');
        const snapshot = await getDocs(productsCollection);
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const cartRef = doc(firestore, 'carts', user.uid);
        const cartSnapshot = await getDoc(cartRef);
        
        // If the cart document doesn't exist, create it with an empty array
        if (!cartSnapshot.exists()) {
          await setDoc(cartRef, { items: [] });
        }

        // Add the product to the cart
        await updateDoc(cartRef, {
          items: arrayUnion({ ...product, quantity: 1 })
        });
        setSuccess('Product added to cart');
      } catch (error) {
        setError('Error adding to cart');
        console.error('Error adding to cart:', error);
      }
    } else {
      setError('User not authenticated');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Product Page</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {success && <div className="alert alert-success" role="alert">{success}</div>}
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><strong>Price: ${product.price.toFixed(2)}</strong></p>
                    <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;

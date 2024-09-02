import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(firestore, 'products');
        const snapshot = await getDocs(productsCollection);
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
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
        const cartData = cartSnapshot.data() || { items: [] };
        const updatedItems = [...cartData.items, { ...product, quantity: 1 }];

        await setDoc(cartRef, { items: updatedItems });
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      console.error('User not authenticated');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Product Page</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Price: ${product.price}</strong></p>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;

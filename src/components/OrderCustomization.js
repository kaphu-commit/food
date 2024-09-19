import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Ensure you have the correct import for Firebase Auth
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderCustomization = () => {
  const [customization, setCustomization] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Set the user state with the current authenticated user
    }
  }, []);

  const handleCustomizationChange = (e) => {
    setCustomization(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (customization.trim() === '') {
      setError('Please enter customization details.');
      return;
    }
    
    try {
      // Simulate sending data to a backend or a service
      console.log('Submitting customization:', customization, 'from:', user ? user.email : 'Unknown User');

      // Simulate a successful submission
      setSubmitted(true);
      setError('');
      setCustomization('');
    } catch (error) {
      setError('An error occurred while submitting your customization.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customize Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="5"
            value={customization}
            onChange={handleCustomizationChange}
            placeholder="Enter customization details"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {submitted && (
          <div className="alert alert-success mt-3" role="alert">
            Customization details submitted successfully! <br />
            <strong>{user ? user.email : 'Unknown User'}</strong>: {customization}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default OrderCustomization;
 
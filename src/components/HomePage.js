// components/HomePage.js
import React from 'react';
import Footer from './Footer'; // Import the Footer component

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center mb-4">Welcome to the Food Delivery App!</h1>
      <p className="text-center">Explore our services and enjoy your meal.</p>
      <p className="text-center">Use the navigation bar to visit different pages.</p>
      <Footer /> {/* Include the Footer here */}
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS and Popper.js
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Font Awesome Icons

// Import components
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import DeliveryMap from './components/DeliveryMap';
import DiscountCode from './components/DiscountCode';
import GeoLocation from './components/GeoLocation';
import LiveChat from './components/LiveChat';
import LoyaltyRewards from './components/LoyaltyRewards';
import OrderCustomization from './components/OrderCustomization';
import OrderHistory from './components/OrderHistory';
import OrderTracking from './components/OrderTracking';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import DynamicPricing from './components/DynamicPricing';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container">
            <Link className="navbar-brand" to="/">Food Delivery App</Link>
            <button className="btn btn-primary" onClick={toggleMenu}>
              {menuOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
        </nav>

        {/* Conditional Menu */}
        {menuOpen && (
          <div className="sidebar-menu">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/signup">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/checkout">Checkout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/delivery-map">Delivery Map</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/discount-code">Discount Code</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/geo-location">Geo Location</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/live-chat">Live Chat</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/loyalty-rewards">Loyalty Rewards</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/order-customization">Order Customization</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/order-history">Order History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/order-tracking">Order Tracking</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/personalized-recommendations">Personalized Recommendations</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/dynamic-pricing">Dynamic Pricing</Link>
              </li>
            </ul>
          </div>
        )}

        {/* Main Content */}
        <main className="container mt-4">
          <h1 className="text-center mb-4">Welcome to the Food Delivery App!</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/delivery-map" element={<DeliveryMap location={{ lat: 51.505, lng: -0.09 }} />} />
            <Route path="/discount-code" element={<DiscountCode />} />
            <Route path="/geo-location" element={<GeoLocation />} />
            <Route path="/live-chat" element={<LiveChat />} />
            <Route path="/loyalty-rewards" element={<LoyaltyRewards />} />
            <Route path="/order-customization" element={<OrderCustomization />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-tracking" element={<OrderTracking orderId="12345" />} />
            <Route path="/personalized-recommendations" element={<PersonalizedRecommendations />} />
            <Route path="/dynamic-pricing" element={<DynamicPricing productId="product1" />} />
            <Route path="/" element={
              <div className="text-center">
                <p>Explore our services and enjoy your meal.</p>
                <p>Use the navigation bar to visit different pages.</p>
              </div>
            } />
            <Route path="*" element={<div className="text-center"><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h5 className="text-center text-md-start mb-4 mb-md-0">Contact Us</h5>
                <p><strong>Email:</strong> <a href="mailto:info@example.com" className="text-white text-decoration-none">kap@.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+1234567890" className="text-white text-decoration-none">+1-234-567-890</a></p>
              </div>
              <div className="col-md-6">
                <h5 className="text-center text-md-end mb-4 mb-md-0">Follow Us</h5>
                <div className="d-flex justify-content-center justify-content-md-end">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                    <FaFacebookF size={30} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                    <FaTwitter size={30} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                    <FaInstagram size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Custom Styles */}
        <style jsx>{`
          .sidebar-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100%;
            background-color: #f8f9fa; /* Menu background color */
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            z-index: 1000;
            padding: 15px;
            transition: transform 0.3s ease;
          }
          
          .sidebar-menu ul {
            list-style: none;
            padding: 0;
          }

          .nav-link {
            color: #333; /* Default link color */
            text-decoration: none;
          }

          .nav-link:hover {
            color: #007bff; /* Link color on hover */
          }

          .sidebar-menu {
            transform: translateX(${menuOpen ? '0' : '-100%'});
          }

          .btn-primary {
            background-color: #007bff; /* Button background color */
            border: none;
          }

          .btn-primary:hover {
            background-color: #0056b3; /* Button background color on hover */
          }
        `}</style>
      </div>
    </Router>
  );
};

export default App;
